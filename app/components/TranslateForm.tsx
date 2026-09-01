import LanguageSelection from "./LanguageSelection";
import TextToSpeech from "./TextToSpeech";
import CopyText from "./CopyText";
import TranslationButton from "./TranslationButton";

export default function TranslateForm() {
  return (
    <div className="translate-form">
      <div className="box detection">
        {/* Set english as default text language to be translated && hide language detection button */}
        <LanguageSelection showDetectLanguage={true} defaultLanguage="english" />
        <textarea
          name="input-content"
          id="inputContent"
          placeholder="Hello, how are you?"
          maxLength={500}
        />
        <div className="counter-container">19/500</div>
        <div className="tranlation-action-button">
          <div className="sound-and-copy-button-container">
            <TextToSpeech />
            <CopyText />
          </div>
          <div className="translation-button-container">
            <TranslationButton />
          </div>
        </div>
      </div>
      <div className="box translation">
        {/* Set french as default translated text language && hide language detection button */}
        <LanguageSelection showDetectLanguage={false} defaultLanguage="french" />
        <div className="translated-text-container">
          <span id="translated-text">Bonjour, comment allez-vous ?</span>
        </div>
        {/* <textarea
          name="output-content"
          id="outputContent"
          placeholder="Bonjour, comment allez-vous ?"
        /> */}
        <div className="tranlation-action-button">
          <div className="sound-and-copy-button-container">
            <TextToSpeech />
            <CopyText />
          </div>
          <div className="translation-button-container">
            {/* Hide the translation button on this side of form */}
            {/* <TranslationButton /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
