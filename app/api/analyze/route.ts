import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";
import { POPULAR_APPS } from "@/lib/popular-apps";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

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
    const { content, type } = await req.json();

    if (!content) {
      return NextResponse.json(
        { error: "No content provided" },
        { status: 400 }
      );
    }

    // CHECK FOR POPULAR APPS (Pre-computed data)
    // Only check if it's a URL or a short string (likely a user typing "facebook")
    // If it's a long text block, we should ALWAYS analyze it with AI.
    let matchedKey: string | undefined;

    if (type === "url" || content.length < 100) {
      const lowerContent = content.toLowerCase();
      matchedKey = Object.keys(POPULAR_APPS).find(key => lowerContent.includes(key));
    }

    if (matchedKey) {
      console.log(`Matched popular app: ${matchedKey}, returning pre-computed result.`);
      // Simulate a small network delay for realism
      await new Promise(resolve => setTimeout(resolve, 800));
      return NextResponse.json(POPULAR_APPS[matchedKey]);
    }

    if (!process.env.GROQ_API_KEY) {
      console.error("GROQ_API_KEY is not set");
      return NextResponse.json(
        { error: "Groq API key not configured. Please add GROQ_API_KEY to .env.local" },
        { status: 500 }
      );
    }

    let textToAnalyze = content;

    // If it's a URL, fetch the content first
    if (type === "url") {
      try {
        console.log("Fetching URL:", content);
        const response = await fetch(content, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        });

        if (!response.ok) {
          return NextResponse.json(
            { error: `Could not fetch URL (${response.status}). Try using Text mode instead.` },
            { status: 400 }
          );
        }

        textToAnalyze = await response.text();
        // Basic HTML stripping
        textToAnalyze = textToAnalyze.replace(/<[^>]*>/g, " ").slice(0, 50000);
        console.log("Fetched text length:", textToAnalyze.length);
      } catch (fetchError) {
        console.error("Fetch error:", fetchError);
        return NextResponse.json(
          { error: "Could not fetch URL. The website may be blocking requests. Try using Text mode." },
          { status: 400 }
        );
      }
    }

    if (textToAnalyze.length < 100) {
      return NextResponse.json(
        { error: "Content too short. Please provide more text to analyze." },
        { status: 400 }
      );
    }

    console.log("Calling Groq API with Llama...");

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: `Analyze this document:\n\n${textToAnalyze.slice(0, 25000)}`,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0,
      max_tokens: 2048,
    });

    const text = chatCompletion.choices[0]?.message?.content;
    console.log("Groq response received");

    if (!text) {
      return NextResponse.json(
        { error: "Empty response from AI" },
        { status: 500 }
      );
    }

    // Parse the JSON response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error("Failed to parse JSON from:", text.slice(0, 200));
      return NextResponse.json(
        { error: "Failed to parse AI response" },
        { status: 500 }
      );
    }

    const analysis = JSON.parse(jsonMatch[0]);
    console.log("Analysis complete, score:", analysis.score);

    return NextResponse.json(analysis);

  } catch (error) {
    console.error("Analysis error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `Analysis failed: ${message}` },
      { status: 500 }
    );
  }
}
