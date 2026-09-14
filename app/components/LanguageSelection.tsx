"use client";
import { useEffect, useState } from "react";
import ExpandDownButton from "./ExpandDownButton";
import SwitchLanguages from "./SwitchLanguages";

interface Language {
  code: string;
  label: string;
}

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
  const [languages, setLanguages] = useState([]);


  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const results = await fetch("/api/translate");
        const data = await results.json();
        setLanguages(data.languages);
        console.log("data =", data.languages);
      } catch (error) {
        console.log("Error fetching languages list", error);
      }
    };
    
    fetchLanguages();
  }, []);

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
            {/* <button className={activeLanguage === "es" ? "active" : ""} onClick={() => handleLanguageClick("es")}>
                Spanish{" "}
                <ExpandDownButton/>{" "}
            </button> */}
            <select
              value={activeLanguage}
              onChange={(e) => handleLanguageClick(e.target.value)}
            >
              {
                languages.map(({ code, label }) => (
                  <option key={code} value={code}>
                    {label}
                  </option>
                ))
              }
            </select>
            {/* <ExpandDownButton/> */}
        </div>
        <div className="switch-container">
            {showSwitchLanguage && <SwitchLanguages onSwitch={onSwitch} />}
        </div>
      </div>
    </div>
  );
}
