import { NextResponse } from "next/server";

// Languages ​​supported by MyMemory
const MYMEMORY_LANGUAGES: { code: string; label: string }[] = [
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
  try {
    const availability = await fetch(
      "https://api.mymemory.translated.net/get?q=test&langpair=en|fr",
      { cache: "no-store" },
    );
    if (!availability.ok) throw new Error("API unreachable");
  } catch {
    return NextResponse.json(
      { error: "Translation API unavailable" },
      { status: 503 },
    );
  }

  return NextResponse.json({ languages: MYMEMORY_LANGUAGES });
} 