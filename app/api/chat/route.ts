import Groq from "groq-sdk";
import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are SafeAgree's AI Legal Assistant. 
Your goal is to help users understand their legal documents (Terms of Service, Contracts, etc.) in simple, everyday language that anyone can understand.

Rules:
1. Speak like a helpful human, not a lawyer. Use "human words" - avoid complex jargon.
2. Use the provided "Document Context" to answer questions.
3. Be concise and clear. Explain things simply, as if explaining to a non-expert friend.
4. If the user asks for legal advice, politely decline and remind them you are an AI tool.
5. Format your responses with clear paragraphs or bullet points if needed.`;

export async function POST(req: NextRequest) {
    try {
        const { messages, context } = await req.json();

        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json({ error: "Invalid messages format" }, { status: 400 });
        }

        // Initialize Clients Lazily
        const groqApiKey = process.env.GROQ_API_KEY;
        const sambanovaApiKey = process.env.SAMBANOVA_API_KEY;
        // const geminiApiKey = process.env.GEMINI_API_KEY; // User said they haven't added Gemini yet

        const groq = groqApiKey ? new Groq({ apiKey: groqApiKey }) : null;
        const sambanova = sambanovaApiKey ? new OpenAI({
            apiKey: sambanovaApiKey,
            baseURL: "https://api.sambanova.ai/v1",
        }) : null;

        // Construct conversation with context
        const conversation = [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "system", content: `DOCUMENT CONTEXT START:\n${context?.slice(0, 50000) || "No context provided."}\nDOCUMENT CONTEXT END` },
            ...messages
        ];

        let responseContent: string | null = null;
        let providerError: string | null = null;

        // 1. Try Groq (Llama 8b for speed)
        if (groq) {
            try {
                const completion = await groq.chat.completions.create({
                    messages: conversation as any,
                    model: "llama-3.1-8b-instant",
                    temperature: 0.5,
                    max_tokens: 1024,
                });
                responseContent = completion.choices[0]?.message?.content || null;
            } catch (err) {
                console.error("Groq Chat Error:", err);
                providerError = "Groq unavailable";
            }
        }

        // 2. Failover to SambaNova (Llama 70b for quality)
        if (!responseContent && sambanova) {
            console.log("Failing over to SambaNova for chat...");
            try {
                const completion = await sambanova.chat.completions.create({
                    messages: conversation as any,
                    model: "Meta-Llama-3.1-70B-Instruct",
                    temperature: 0.5,
                    max_tokens: 1024,
                });
                responseContent = completion.choices[0]?.message?.content || null;
            } catch (err) {
                console.error("SambaNova Chat Error:", err);
                providerError = "SambaNova unavailable";
            }
        }

        if (!responseContent) {
            return NextResponse.json(
                { error: "AI Assistant is temporarily busy. Please try again later." },
                { status: 503 }
            );
        }

        return NextResponse.json({ content: responseContent });

    } catch (error) {
        console.error("Chat API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
