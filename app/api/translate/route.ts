import { NextRequest, NextResponse } from "next/server";

// Languages ​​supported by MyMemory
const MYMEMORY_LANGUAGES = [
  { code: "en", label: "English" },
  { code: "fr", label: "French" },
  { code: "es", label: "Spanish" },
  { code: "it", label: "Italian" },
  { code: "de", label: "German" },
  { code: "pt", label: "Portuguese" },
  { code: "ru", label: "Russian" },
  { code: "zh", label: "Chinese" },
  { code: "ja", label: "Japanese" },
  { code: "ar", label: "Arabic" },
  { code: "nl", label: "Dutch" },
  { code: "pl", label: "Polish" },
  { code: "sv", label: "Swedish" },
  { code: "tr", label: "Turkish" },
  { code: "ko", label: "Korean" },
];

// returns available languages
export async function GET() {
  return NextResponse.json({ languages: MYMEMORY_LANGUAGES });
} 

// Avoid CORS errors
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