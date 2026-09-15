import { NextResponse } from "next/server";

// Languages ​​supported by MyMemory
const MYMEMORY_LANGUAGES: { code: string; label: string }[] = [
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
// initially, we were doing a translation test to verify that the MyMemory API is reachable
// we're just going to return the static list directly

  return NextResponse.json({ languages: MYMEMORY_LANGUAGES });
} 