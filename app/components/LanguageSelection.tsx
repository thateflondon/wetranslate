"use client";
import { useEffect, useState } from "react";
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
  // state for main buttons (EN, FR, Detect)
  const activeLanguage = currentLang || defaultLanguage; 
  const [languages, setLanguages] = useState<Language[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // execute once
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const results = await fetch("/api/languages");
        const data = await results.json();
        setLanguages(data.languages);
      } catch (error) {
        setError(true);
        console.log("Error fetching languages list", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLanguages();
  }, []);

  // handle language change
  const handleLanguageClick = (lang: string) => {
    onLanguageChange?.(lang);
  };

  // handle language change for the select
  const handleSelectChange = (lang: string) => {
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
            {error ? (
              <span className="text-red-500 text-sm">Unavailable</span>
            ) : (
              <select
              name="other-languages"
              className={!["en", "fr", "detect"].includes(activeLanguage) ? "active" : ""}
              value={currentLang || "es"}
              onChange={(e) => handleSelectChange(e.target.value)}
              disabled={loading}
              >
                {loading ? (
                  <option>Loading</option>
                ) : (
                  languages.map(({ code, label }) => (
                    <option key={code} value={code}>{label}</option>
                  ))
                )}
              </select>  
            )}
            {/* <ExpandDownButton/> */}
        </div>
        <div className="switch-container">
            {showSwitchLanguage && <SwitchLanguages onSwitch={onSwitch} />}
        </div>
      </div>
    </div>
  );
}