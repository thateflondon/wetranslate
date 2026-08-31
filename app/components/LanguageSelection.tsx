"use client"
import { useState } from "react";
import ExpandDownButton from "./ExpandDownButton"

interface LanguageSelectionProps {
  showDetectLanguage?: boolean;
}

export default function LanguageSelection({ showDetectLanguage = true }: LanguageSelectionProps) {

    //Add a class to the selected language
    const [isActive, setIsActive] = useState(false);
    const ToggleButton = () => {
        setIsActive(!isActive);
    }

  return (
    <div className="language-selector">
      {showDetectLanguage && <button onClick={ToggleButton} className={isActive ? "active" : ""} >Detect Language</button>}
      <button className={isActive ? "active" : ""} onClick={ToggleButton}>English</button>
      <button className={isActive ? "active" : ""} onClick={ToggleButton}>French</button>
      <button className={`flex ${isActive ? "active" : ""}`} onClick={ToggleButton}>
        Spanish{" "}
        <ExpandDownButton/>{" "}
      </button>
    </div>
  )
}
