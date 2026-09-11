import Image from "next/image";
import { useState, useRef, useEffect } from "react";

interface CopyTextProps {
  text: string;
}

export default function CopyText({ text }: CopyTextProps) {
  // used the clipboard API
  const [copied, setCopied] = useState(false);
  // set auto-reset so the copied button returns to it initial state
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  async function handleCopy() {
    try {
      // we copy the with this method that returns a promise
      await navigator.clipboard.writeText(text);
      setCopied(true);

      // Clear any existing timeout
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      // return to initial state after 2s
      timeoutRef.current = setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  }

  // Clean up on unmount
  useEffect(() => {
    return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }
  }, []);

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
