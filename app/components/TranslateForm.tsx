"use client";
import { useState } from "react";
import LanguageSelection from "./LanguageSelection";
import TextToSpeech from "./TextToSpeech";
import CopyText from "./CopyText";
import TranslationButton from "./TranslationButton";

export default function TranslateForm() {
  const [translatingText, setTranslatingText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  // make langpair dynamic
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("fr");

  // Fectching datas from API
  const fetchData = async () => {
    try {
      // Langpair should be dynamic
      const langPair = sourceLang === "detect" ? `auto|${targetLang}` : `${sourceLang}|${targetLang}`;

      const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(translatingText)}&langpair=${langPair}`);

      // API response
      const data = await response.json();

      // retrieve response
      setTranslatedText(data.responseData.translatedText);
      console.log(data);

    } catch (error) {
      console.error("Error when fetching data", error);
    }
  };

  const handleTranslate = () => {
    // click on translate button calls fetchData()
    fetchData();
  };

  return (
    <div className="translate-form">
      <div className="box detection">
        {/* Set english as default text language to be translated && hide language detection button */}
        <LanguageSelection
          showDetectLanguage={true}
          defaultLanguage="en"
          onLanguageChange={setSourceLang}
        />
        <textarea
          name="input-content"
          id="inputContent"
          value={translatingText}
          onChange={(e) => setTranslatingText(e.target.value)}
          maxLength={500}
        />
        <div className="counter-container">19/500</div>
        <div className="tranlation-action-button">
          <div className="sound-and-copy-button-container">
            <TextToSpeech />
            <CopyText text={translatingText} />
          </div>
          <div className="translation-button-container">
            <TranslationButton onClick={handleTranslate} />
          </div>
        </div>
      </div>
      <div className="box translation">
        {/* Set french as default translated text language && hide language detection button */}
        <LanguageSelection
          showDetectLanguage={false}
          defaultLanguage="fr"
          onLanguageChange={setTargetLang}
        />
        <div className="translated-text-container">
          <span id="translated-text">{translatedText}</span>
        </div>
        {/* <textarea
          name="output-content"
          id="outputContent"
          placeholder="Bonjour, comment allez-vous ?"
        /> */}
        <div className="tranlation-action-button">
          <div className="sound-and-copy-button-container">
            <TextToSpeech />
            <CopyText text={translatedText} />
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
