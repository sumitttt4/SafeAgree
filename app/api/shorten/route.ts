import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { url } = await req.json();

        if (!url) {
            return NextResponse.json({ error: "No URL provided" }, { status: 400 });
        }

        // Use is.gd API for shortening
        // They are lenient with rate limits for moderate usage and don't require auth
        const response = await fetch(`https://is.gd/create.php?format=json&url=${encodeURIComponent(url)}`);

        if (!response.ok) {
            throw new Error("Shortener service failed");
        }

        const data = await response.json();

        if (data.errorcode) {
            throw new Error(data.errormessage || "Shortener error");
        }

        return NextResponse.json({ shortUrl: data.shorturl });

    } catch (error) {
        console.error("Shorten Error:", error);
        // Fallback: If shortening fails, return the original URL but warn
        // Actually, stick to error so frontend handles it or uses long url
        return NextResponse.json({ error: "Failed to shorten link" }, { status: 500 });
    }
}
