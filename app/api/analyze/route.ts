import Groq from "groq-sdk";
import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";
import { POPULAR_APPS } from "@/lib/popular-apps";

const SYSTEM_PROMPT = `You are SafeAgree, an AI legal document analyzer. Your job is to analyze Terms of Service, Privacy Policies, and Contracts to identify potential risks and benefits for the user.

Analyze the provided text and return a JSON response with this exact structure:
{
  "score": <number 0-100, where 100 is safest>,
  "summary": "<one sentence summary of the document>",
  "redFlags": [
    {
      "title": "<short title>",
      "description": "<explanation of why this is concerning>",
      "severity": "high" | "medium" | "low"
    }
  ],
  "greenFlags": [
    {
      "title": "<short title>",
      "description": "<explanation of why this is good>"
    }
  ],
  "grayFlags": [
    {
      "title": "<category name>",
      "value": "<the value/detail>"
    }
  ]
}

Guidelines:
- Red Flags: Data selling, arbitration clauses, perpetual licenses, hidden fees, difficult cancellation
- Green Flags: GDPR compliance, easy deletion, refund policies, encryption, data portability
- Gray Flags: "Contact" (email/link), "Jurisdiction", "Age", "Notice Period". Keep values SHORT.
- Be concise but specific
- Score 80-100 = Safe, 60-79 = Caution, 0-59 = Risky
- Respond ONLY with valid JSON. No markdown, no explanations.`;

export async function POST(req: NextRequest) {
  try {
    // Initialize Clients Lazily
    const groqApiKey = process.env.GROQ_API_KEY;
    const sambanovaApiKey = process.env.SAMBANOVA_API_KEY;
    const geminiApiKey = process.env.GEMINI_API_KEY;

    const groq = groqApiKey ? new Groq({ apiKey: groqApiKey }) : null;

    // OpenAI client for SambaNova
    const sambanova = sambanovaApiKey ? new OpenAI({
      apiKey: sambanovaApiKey,
      baseURL: "https://api.sambanova.ai/v1",
    }) : null;

    let content: string = "";
    let type: string = "";

    // Check if request is multipart/form-data (file upload)
    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      // Handle file upload
      const formData = await req.formData();
      const file = formData.get("file") as File | null;
      type = formData.get("type") as string || "file";

      if (!file) {
        return NextResponse.json(
          { error: "No file provided" },
          { status: 400 }
        );
      }

      // Check file type
      if (file.type !== "application/pdf") {
        return NextResponse.json(
          { error: "Only PDF files are supported" },
          { status: 400 }
        );
      }

      // Check file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        return NextResponse.json(
          { error: "File too large. Maximum size is 10MB" },
          { status: 400 }
        );
      }

      // Parse PDF
      try {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Use require for pdf-parse (no ES module support)
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const pdfParse = require("pdf-parse");
        const pdfData = await pdfParse(buffer);
        content = pdfData.text.slice(0, 300000); // Limit to 300k chars

        if (content.length < 50) {
          return NextResponse.json(
            { error: "Could not extract text from PDF. The file may be image-based or encrypted." },
            { status: 400 }
          );
        }

        console.log(`Parsed PDF: ${file.name}, extracted ${content.length} characters`);
      } catch (pdfError) {
        console.error("PDF parsing error:", pdfError);
        return NextResponse.json(
          { error: "Failed to parse PDF file. Please try copying the text and using Text mode." },
          { status: 400 }
        );
      }
    } else {
      // Handle JSON request (URL or text)
      const body = await req.json();
      content = body.content;
      type = body.type;
    }

    if (!content) {
      return NextResponse.json(
        { error: "No content provided" },
        { status: 400 }
      );
    }

    // CHECK FOR POPULAR APPS (Pre-computed data)
    let matchedKey: string | undefined;
    if (type === "url" || content.length < 100) {
      const lowerContent = content.toLowerCase();
      matchedKey = Object.keys(POPULAR_APPS).find(key => lowerContent.includes(key));
    }

    if (matchedKey) {
      console.log(`Matched popular app: ${matchedKey}, returning pre-computed result.`);
      await new Promise(resolve => setTimeout(resolve, 800));
      return NextResponse.json(POPULAR_APPS[matchedKey]);
    }

    let textToAnalyze = content;

    // URL Fetching Logic
    if (type === "url") {
      try {
        let urlToFetch = content.trim();
        if (!urlToFetch.startsWith("http://") && !urlToFetch.startsWith("https://")) {
          urlToFetch = "https://" + urlToFetch;
        }

        console.log("Fetching URL:", urlToFetch);
        const response = await fetch(urlToFetch, {
          headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
        });

        if (!response.ok) throw new Error(`Status ${response.status}`);
        const html = await response.text();

        // Remove script and style elements content specifically
        let cleanText = html.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gim, "")
          .replace(/<style\b[^>]*>([\s\S]*?)<\/style>/gim, "");

        // Strip remaining HTML tags
        cleanText = cleanText.replace(/<[^>]*>/g, " ");

        // Collapse multiple spaces/newlines
        cleanText = cleanText.replace(/\s+/g, " ").trim();

        // Limit to approx 50k words (300k chars)
        textToAnalyze = cleanText.slice(0, 300000);

        // Fallback: If content is too short (likely SPA/JS-only), try Jina.ai Reader
        if (textToAnalyze.length < 500) {
          console.log("Direct fetch yielded low content. Attempting Jina.ai Reader fallback...");
          try {
            const jinaResponse = await fetch(`https://r.jina.ai/${urlToFetch}`, {
              headers: {
                'User-Agent': 'SafeAgree/1.0',
                'Authorization': `Bearer ${process.env.JINA_API_KEY || ''}`
              }
            });

            if (jinaResponse.ok) {
              const jinaText = await jinaResponse.text();
              if (jinaText.length > 200) {
                console.log("Jina Reader success. Length:", jinaText.length);
                textToAnalyze = jinaText.slice(0, 300000);
              }
            }
          } catch (jinaError) {
            console.warn("Jina fallback failed:", jinaError);
          }
        }
      } catch (fetchError) {
        console.error("Fetch error:", fetchError);
        return NextResponse.json(
          { error: "Could not fetch URL. Try using Text mode." },
          { status: 400 }
        );
      }
    }

    if (textToAnalyze.length < 50) {
      return NextResponse.json({ error: "Content too short or could not be extracted." }, { status: 400 });
    }

    // --- AI GENERATION LOGIC WITH FAILOVER ---
    let jsonResponseText: string | null | undefined = null;
    let providerErrors: string[] = [];

    // 1. Try Groq
    try {
      if (!groq) throw new Error("GROQ_API_KEY missing");
      console.log("Attempting analysis with Groq (Llama-3.1-8b-instant)... Length:", textToAnalyze.length);

      const chatCompletion = await groq.chat.completions.create({
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: `Analyze this document:\n\n${textToAnalyze}` },
        ],
        model: "llama-3.1-8b-instant",
        temperature: 0,
        max_tokens: 4096,
      });

      jsonResponseText = chatCompletion.choices[0]?.message?.content;
      console.log("Groq success.");
    } catch (groqError) {
      const errMsg = groqError instanceof Error ? groqError.message : String(groqError);
      console.error("Groq failed:", errMsg);
      providerErrors.push(`Groq: ${errMsg}`);

      // 2. Failover to SambaNova
      if (sambanova) {
        console.log("Failing over to SambaNova (Meta-Llama-3.1-70B-Instruct)...");
        try {
          const completion = await sambanova.chat.completions.create({
            model: "Meta-Llama-3.1-70B-Instruct",
            messages: [
              { role: "system", content: SYSTEM_PROMPT },
              { role: "user", content: `Analyze this document:\n\n${textToAnalyze}` },
            ],
            temperature: 0.1,
            top_p: 0.1,
          });
          jsonResponseText = completion.choices[0]?.message?.content;
          console.log("SambaNova success.");
        } catch (sambaError) {
          const sambaErrMsg = sambaError instanceof Error ? sambaError.message : String(sambaError);
          console.error("SambaNova failed:", sambaErrMsg);
          providerErrors.push(`SambaNova: ${sambaErrMsg}`);
        }
      } else {
        console.warn("SAMBANOVA_API_KEY not found or client init failed, skipping failover.");
        providerErrors.push("SambaNova: API Key missing");
      }

      // 3. Third failover to Google Gemini
      if (!jsonResponseText && geminiApiKey) {
        console.log("Failing over to Google Gemini...");
        try {
          const { GoogleGenerativeAI } = await import("@google/generative-ai");
          const genAI = new GoogleGenerativeAI(geminiApiKey);
          const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

          const result = await model.generateContent([
            { text: SYSTEM_PROMPT },
            { text: `Analyze this document:\n\n${textToAnalyze}` }
          ]);

          jsonResponseText = result.response.text();
          console.log("Gemini success.");
        } catch (geminiError) {
          const geminiErrMsg = geminiError instanceof Error ? geminiError.message : String(geminiError);
          console.error("Gemini failed:", geminiErrMsg);
          providerErrors.push(`Gemini: ${geminiErrMsg}`);
        }
      }
    }

    if (!jsonResponseText) {
      // Log full errors for monitoring, but show friendly message to user
      console.error("All AI providers failed:", providerErrors);
      return NextResponse.json(
        { error: "Service is temporarily busy. We will be back shortly." },
        { status: 503 }
      );
    }

    // Parse JSON
    const jsonMatch = jsonResponseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json({ error: "Failed to parse AI response" }, { status: 500 });
    }

    const analysis = JSON.parse(jsonMatch[0]);
    return NextResponse.json(analysis);

  } catch (error) {
    console.error("Handler error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
