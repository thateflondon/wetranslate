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
      // const langPair = sourceLang === "detect" ? `auto|${targetLang}` : `${sourceLang}|${targetLang}`;

      // const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(translatingText)}&langpair=${langPair}`);
      
      // Fix language detection using an API (https://detectlanguage.com/ 1k request/day on free tier)
      const detectLanguage = async (text: string) => {
        try {
          // send the text to API route for detection
          const response = await fetch(
            "/api/detect-language",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ text }),
            },
          );
          const data = await response.json();
          // return the detected language
          return data.data.detections[0].language;
        } catch (error) {
          return "en";
        }
      };

      // init detected language
      let detectedLang = sourceLang;
      // detect the source language from the "Detect language" boutton
      if (sourceLang === "detect") {
        detectedLang = await detectLanguage(translatingText);
        // update UI
        setSourceLang(detectedLang);
      }

      const response = await fetch(`https://api.mymemory.translated.net/get?q=${translatingText}&langpair=${detectedLang}|${targetLang}`);

      // API response
      const data = await response.json();

      // retrieve response / translated text
      setTranslatedText(data.responseData.translatedText);
      
    } catch (error) {
      console.error("Error when fetching data", error);
    }
  };

  const handleTranslate = () => {
    // click on translate button calls fetchData()
    fetchData();
  };

  const handleSwitch = () => {
    // temporary variables to avoid overwriting values
    const tempText = translatingText;
    const tempLang = sourceLang;

    // reverse the texts
    setTranslatingText(translatedText);
    setTranslatedText(tempText);

    // reverse the languages
    setSourceLang(targetLang);
    setTargetLang(tempLang);
  }

  return (
    <div className="translate-form">
      <div className="box detection">
        {/* Set english as default text language to be translated && hide language detection button */}
        <LanguageSelection
          showDetectLanguage={true}
          defaultLanguage="en"
          currentLang={sourceLang} // pass active language on switch
          onLanguageChange={setSourceLang}
          showSwitchLanguage={false} // hide language switch in translating text section
        />
        <textarea
          name="input-content"
          id="inputContent"
          value={translatingText}
          onChange={(e) => setTranslatingText(e.target.value)}
          maxLength={500}
        />
        <div className="counter-container">{translatingText.length}/500</div>
        <div className="tranlation-action-button">
          <div className="sound-and-copy-button-container">
            <TextToSpeech text={translatingText} lang={sourceLang} />
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
          currentLang={targetLang} // pass active language on switch
          onLanguageChange={setTargetLang}
          showSwitchLanguage={true}
          onSwitch={handleSwitch}
        />
        <div className="translated-text-container">
          <span id="translated-text">{translatedText}</span>
        </div>
        <div className="tranlation-action-button">
          <div className="sound-and-copy-button-container">
            <TextToSpeech text={translatedText} lang={targetLang} />
            <CopyText text={translatedText} />
          </div>
        </div>
      </div>
    </div>
  );
}