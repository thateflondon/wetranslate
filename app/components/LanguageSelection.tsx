"use client";
import { useEffect, useState, useRef } from "react";
import SwitchLanguages from "./SwitchLanguages";
import ExpandDownButton from "./ExpandDownButton";

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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // execute once and fetch data
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const results = await fetch("/api/languages");
        if (!results.ok) {
          throw new Error(`Failed to load languages: ${results.status}`);
        }
        const data = await results.json();
        setLanguages(data.languages);
      } catch (error) {
        setError(true);
        console.error("Error fetching languages list", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLanguages();
  }, []);

  // close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // handle language change
  const handleLanguageClick = (lang: string) => {
    onLanguageChange?.(lang);
  };

  // handle language change for the select
  const handleSelectChange = (lang: string) => {
    onLanguageChange?.(lang);
    setDropdownOpen(false);
  };

  // get current language label
  const getCurrentLabel = () => {
    if (!currentLang || ["en", "fr", "detect"].includes(currentLang)) {
      return "Spanish";
    }
    return languages.find(l => l.code === currentLang)?.label || "Spanish";
  };

  return (
    <div className="language-selector">
      <div className="language-selector-container flex center justify-between">
        <div className="language-container">
            {showDetectLanguage && <button className={`language-choice ${activeLanguage === "detect" ? "active" : ""}`} onClick={() => handleLanguageClick("detect")}>Detect Language</button>}
            <button className={`language-choice ${activeLanguage === "en" ? "active" : ""}`} onClick={() => handleLanguageClick("en")}>English</button>
            <button className={`language-choice ${activeLanguage === "fr" ? "active" : ""}`} onClick={() => handleLanguageClick("fr")}>French</button>

            {/* create dropdown button */}
            <div className="dropdown" ref={dropdownRef}>
              <button
                className={`language-choice ${!["en", "fr", "detect"].includes(activeLanguage) ? "active" : ""}`}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {getCurrentLabel()}
                <ExpandDownButton />
              </button>

              {dropdownOpen && !error && !loading && (
                <div className="dropdown-menu">
                  {languages.map(({ code, label }) => (
                    <div
                      key={code}
                      className="dropdown-item"
                      onClick={() => handleSelectChange(code)}
                    >
                      {label}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {error && <span className="text-red-500 text-sm">Unavailable</span>}
        </div>
        <div className="switch-container">
            {showSwitchLanguage && <SwitchLanguages onSwitch={onSwitch} />}
        </div>
      </div>
    </div>
  );
}