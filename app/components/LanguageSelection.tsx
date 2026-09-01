"use client"
import { useState } from "react";
import ExpandDownButton from "./ExpandDownButton"

interface LanguageSelectionProps {
  showDetectLanguage?: boolean;
  defaultLanguage?: string;
}

export default function LanguageSelection({ showDetectLanguage = true, defaultLanguage = "english" }: LanguageSelectionProps) {

    const [activeLanguage, setActiveLanguage] = useState(defaultLanguage);

  return (
    <div className="language-selector">
      {showDetectLanguage && <button className={activeLanguage === "detect" ? "active" : ""} onClick={() => setActiveLanguage("detect")}>Detect Language</button>}
      <button className={activeLanguage === "english" ? "active" : ""} onClick={() => setActiveLanguage("english")}>English</button>
      <button className={activeLanguage === "french" ? "active" : ""} onClick={() => setActiveLanguage("french")}>French</button>
      <button className={activeLanguage === "spanish" ? "active" : ""} onClick={() => setActiveLanguage("spanish")}>
        Spanish{" "}
        <ExpandDownButton/>{" "}
      </button>
    </div>
  )
}
