import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { q, langpair } = await request.json();

    if (!q || !langpair) {
      return NextResponse.json(
        { error: "Missing parameters" },
        { status: 400 },
      );
    }

    // MyMemory API accepts POST with form-data
    const formData = new URLSearchParams();
    formData.append("q", q);
    formData.append("langpair", langpair);

    const response = await fetch("https://api.mymemory.translated.net/get", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Translation failed" }, { status: 500 });
  }
}