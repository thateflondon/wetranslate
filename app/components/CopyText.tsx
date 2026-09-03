import Image from "next/image";
import { useState, useRef } from "react";

interface CopyTextProps {
  text: string;
}

export default function CopyText({ text }: CopyTextProps) {
  // used the clipboard API
  const [copied, setCopied] = useState(false);
  // set auto-reset so the copied button returns to it initial state
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  async function handleCopy() {
    console.log("j'ai cliqué sur le bouton copie du texte");
    try {
      // we copy the with this method that returns a promise  
      await navigator.clipboard.writeText(text);
      setCopied(true);

      timeoutRef.current = setTimeout(() => {
        setCopied(false);
      }, 2000)

    } catch (error) {
      console.error("Failed to copy:", error);
    }
  }

  return (
    <>
    <button className="w-full h-full" onClick={handleCopy}>
      <Image
        src="/copy-text.svg"
        alt="Copy text"
        width={36}
        height={36}
        className={`copy-text w-full h-full ${copied ? "brightness-180 transition-all duration-300" : ""}`}
      />
    </button>
    </>
  );
}
