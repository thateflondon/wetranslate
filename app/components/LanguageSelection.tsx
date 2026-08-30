import ExpandDownButton from "./ExpandDownButton"

interface LanguageSelectionProps {
  showDetectLanguage?: boolean;
}

export default function LanguageSelection({ showDetectLanguage = true }: LanguageSelectionProps) {
  return (
    <div className="language-selector">
      {showDetectLanguage && <button>Detect Language</button>}
      <button>English</button>
      <button>French</button>
      <button className="flex">
        Spanish{" "}
        <ExpandDownButton/>{" "}
      </button>
    </div>
  )
}
