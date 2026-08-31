import LanguageSelection from "./LanguageSelection";


export default function TranslateForm() {
  return (
    <div className="translate-form">
      <div className="box detection">
        <LanguageSelection showDetectLanguage={true} />
      </div>
      <div className="box translation">
        <LanguageSelection showDetectLanguage={false} />
      </div>
    </div>
  );
}
