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
    <div>
      <div className="flex center justify-between">
        <div className="flex items-start gap-3 h-full mb-[14px] max-[359px]:flex-wrap max-[359px]:max-h-[90px] min-[412.1px]:max-[414px]:flex-wrap min-[412.1px]:max-[414px]:max-h-fit min-[412.1px]:max-[414px]:mb-[10px] min-[414.1px]:max-[512px]:flex-wrap min-[414.1px]:max-[512px]:max-h-[90px] max-[220px]:gap-[1.8692vw]">
            {showDetectLanguage && <button className={`flex justify-center items-center text-[#D2D5DA] text-sm font-bold px-3 py-1.5 h-full box-border cursor-pointer max-[359px]:text-[10px] max-[359px]:px-2.5 max-[359px]:py-1 ${activeLanguage === "detect" ? "bg-[#4D5562] rounded-xl outline-none" : ""}`} onClick={() => handleLanguageClick("detect")}>Detect Language</button>}
            <button className={`flex justify-center items-center text-[#D2D5DA] text-sm font-bold px-3 py-1.5 h-full box-border cursor-pointer max-[359px]:text-[10px] max-[359px]:px-2.5 max-[359px]:py-1 ${activeLanguage === "en" ? "bg-[#4D5562] rounded-xl outline-none" : ""}`} onClick={() => handleLanguageClick("en")}>English</button>
            <button className={`flex justify-center items-center text-[#D2D5DA] text-sm font-bold px-3 py-1.5 h-full box-border cursor-pointer max-[359px]:text-[10px] max-[359px]:px-2.5 max-[359px]:py-1 ${activeLanguage === "fr" ? "bg-[#4D5562] rounded-xl outline-none" : ""}`} onClick={() => handleLanguageClick("fr")}>French</button>

            {/* create dropdown button */}
            <div className="relative inline-block" ref={dropdownRef}>
              <button
                className={`flex justify-center items-center gap-1 text-[#D2D5DA] text-sm font-bold px-3 py-1.5 h-full box-border cursor-pointer max-[359px]:text-[10px] max-[359px]:px-2.5 max-[359px]:py-1 ${!["en", "fr", "detect"].includes(activeLanguage) ? "bg-[#4D5562] rounded-xl outline-none" : ""}`}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {getCurrentLabel()}
                <ExpandDownButton />
              </button>

              {dropdownOpen && !error && !loading && (
                <div className="absolute top-full left-0 mt-1 bg-[#394150] border-[0.5px] border-[#4D5562] rounded-xl min-w-fit max-h-[250px] overflow-y-auto z-[1000] shadow-[0_4px_6px_rgba(0,0,0,0.3)] [&::-webkit-scrollbar]:hidden">
                  {languages.map(({ code, label }) => (
                    <div
                      key={code}
                      className="py-2.5 px-4 text-[#D2D5DA] text-sm font-bold cursor-pointer transition-colors duration-200 hover:bg-[#4D5562]"
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
        <div>
            {showSwitchLanguage && <SwitchLanguages onSwitch={onSwitch} />}
        </div>
      </div>
    </div>
  );
}