"use client"
import { useState } from "react";
import ExpandDownButton from "./ExpandDownButton"

interface LanguageSelectionProps {
  showDetectLanguage?: boolean;
  defaultLanguage?: string;
  onLanguageChange?: (lang: string) => void;
}

export default function LanguageSelection({ showDetectLanguage = true, defaultLanguage = "english", onLanguageChange }: LanguageSelectionProps) {

    const [activeLanguage, setActiveLanguage] = useState(defaultLanguage);

    // handle language change
    const handleLanguageClick = (lang: string) => {
      setActiveLanguage(lang);
      onLanguageChange?.(lang);
    };

  return (
    <div className="language-selector">
      {showDetectLanguage && <button className={activeLanguage === "detect" ? "active" : ""} onClick={() => handleLanguageClick("detect")}>Detect Language</button>}
      <button className={activeLanguage === "en" ? "active" : ""} onClick={() => handleLanguageClick("en")}>English</button>
      <button className={activeLanguage === "fr" ? "active" : ""} onClick={() => handleLanguageClick("fr")}>French</button>
      <button className={activeLanguage === "es" ? "active" : ""} onClick={() => handleLanguageClick("es")}>
        Spanish{" "}
        <ExpandDownButton/>{" "}
      </button>
    </div>
  )
}
