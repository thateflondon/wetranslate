"use client";
import { useEffect, useState } from "react";
import ExpandDownButton from "./ExpandDownButton";
import SwitchLanguages from "./SwitchLanguages";

interface LanguageSelectionProps {
  showDetectLanguage?: boolean;
  defaultLanguage?: string;
  onLanguageChange?: (lang: string) => void;
  showSwitchLanguage?: boolean;
  onSwitch?: () => void;
  currentLang?: string;
}

export default function LanguageSelection({ showDetectLanguage = true, defaultLanguage = "english", onLanguageChange, showSwitchLanguage, onSwitch, currentLang }: LanguageSelectionProps) {
//   const [activeLanguage, setActiveLanguage] = useState(currentLang || defaultLanguage);
    const activeLanguage = currentLang || defaultLanguage;

  // handle language change
  const handleLanguageClick = (lang: string) => {
    // setActiveLanguage(lang);
    onLanguageChange?.(lang);
  };

  return (
    <div className="language-selector">
      <div className="language-selector-container flex center justify-between">
        <div className="language-container">
            {showDetectLanguage && <button className={activeLanguage === "detect" ? "active" : ""} onClick={() => handleLanguageClick("detect")}>Detect Language</button>}
            <button className={activeLanguage === "en" ? "active" : ""} onClick={() => handleLanguageClick("en")}>English</button>
            <button className={activeLanguage === "fr" ? "active" : ""} onClick={() => handleLanguageClick("fr")}>French</button>
            <button className={activeLanguage === "es" ? "active" : ""} onClick={() => handleLanguageClick("es")}>
                Spanish{" "}
                <ExpandDownButton/>{" "}
            </button>
        </div>
        <div className="switch-container">
            {showSwitchLanguage && <SwitchLanguages onSwitch={onSwitch} />}
        </div>
      </div>
    </div>
  );
}
