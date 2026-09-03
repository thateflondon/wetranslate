import Image from "next/image";
import { useState } from "react";

interface CopyTextProps {
  text: string;
}

export default function CopyText({ text }: CopyTextProps) {
  // used the clipboard API
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    console.log("j'ai cliqué sur le bouton copie du texte");
    try {
      // we copy the with this method that returns a promise  
      await navigator.clipboard.writeText(text);
      console.log("le txt copié est le suivant = " + text);
      setCopied(true);
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
