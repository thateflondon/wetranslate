import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    const response = await fetch("https://ws.detectlanguage.com/0.2/detect", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.DETECT_LANGUAGE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ q: text }),
    });

    console.log('API Key:', process.env.DETECT_LANGUAGE_API_KEY);
  console.log('API Key length:', process.env.DETECT_LANGUAGE_API_KEY?.length);

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Detection failed" }, { status: 500 });
  }
}