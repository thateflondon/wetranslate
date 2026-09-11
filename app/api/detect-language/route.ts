import { NextRequest, NextResponse } from "next/server";

// automatic language detection
export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    const response = await fetch("https://ws.detectlanguage.com/0.2/detect", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.DETECT_LANGUAGE_API_KEY}`, // DETECT_LANGUAGE_API_KEY must be set on .env type file
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ q: text }),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Detection failed" }, { status: 500 });
  }
}