'use client';
import Image from 'next/image';
import { useState } from 'react';

interface TextToSpeechProps {
  text: string;
  lang: string;
}

export default function TextToSpeech({text, lang}: TextToSpeechProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeaking = () => {
    console.log(text.trim());
    // avoid launching text-to-speech if the text is empty or contains only spaces
    if(!text.trim()) return;

    // check if speechSynthesis is supported
    if('speechSynthesis' in window) {
      // if already reading, stop
      if(isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }

      // create the utterance
      const utterance = new SpeechSynthesisUtterance(text);
      console.log("utterance = ", utterance);


      // map language codes
      const langMap: Record<string, string> = {
        en: "en-US",
        fr: "fr-FR",
        es: "es-ES",
      };
      utterance.lang = langMap[lang] || "en-US"; 

      console.log({
        text: utterance.text,
        lang: utterance.lang,
        rate: utterance.rate,
        pitch: utterance.pitch,
        volume: utterance.volume,
        voice: utterance.voice,
      });
      // events
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      // play
      window.speechSynthesis.speak(utterance);

    } else {
      alert("Text-to-speech not supported in your browser");
    }
  }

  return (
    <button className='w-full h-full' onClick={handleSpeaking}>
      <Image
        src="/sound.svg"
        alt="Read text"
        width={36}
        height={36}
        className={`sound w-full h-full ${isSpeaking ? "brightness-180 transition-all duration-300" : ""}`}
        // className="sound w-full h-full"
      />
    </button>
  );
}
