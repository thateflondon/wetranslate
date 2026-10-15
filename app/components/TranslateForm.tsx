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
  // error handling
  const [errorEmpty, setErrorEmpty] = useState(false);
  const [errorLanguageSelection, setErrorLanguageSelection] = useState(false);

  // Fectching datas from API
  const fetchData = async () => {
    // languages delection error
    if (sourceLang === targetLang) {
      setErrorLanguageSelection(true);
      setTimeout(() => {
        setErrorLanguageSelection(false);
      }, 3000);
      return;
    }
    // empty text error
    if (!translatingText.trim()) {
      setErrorEmpty(true);
      setTimeout(() => {
        setErrorEmpty(false);
      }, 3000);
      return;
    } 

    try {
      // Fix language detection on button "Detect Language" using an API (https://detectlanguage.com/ 1k request/day on free tier)
      const detectLanguage = async (text: string) => {
        try {
          // send the text to API route for detection
          const response = await fetch(
            "/api/detect-language", 
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ text }),
            }
          );

          if (!response.ok) {
            throw new Error(`Language detection failed: ${response.status}`);
          }

          const data = await response.json();
          // return the detected language
          return data.data.detections[0].language;
        } catch (error) {
          console.error("Detection failed", error);
          return "en";
        }
      };

      // init language detection
      let detectedLang = sourceLang;
      // detect the source language from the "Detect language" boutton
      if (sourceLang === "detect") {
        detectedLang = await detectLanguage(translatingText);
        // update UI
        setSourceLang(detectedLang);
      }

      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${translatingText}&langpair=${detectedLang}|${targetLang}`,
      );

      if (!response.ok) {
        throw new Error(`Translation failed: ${response.status}`);
      }

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
    <div>
      <div className="flex justify-between items-center gap-3 max-w-[1206px] w-full mx-auto lg:max-xl:w-[calc(100%-144px)] max-lg:flex-col max-lg:max-w-[880px] max-lg:w-full max-[412px]:w-[calc(100%-24px)] min-[412.1px]:max-[992px]:w-[calc(100%-48px)]">
        <div className="max-w-[597px] w-full h-[339px] border-[0.5px] border-[#4D5562] bg-[#394150] rounded-3xl p-6 max-lg:max-w-[880px] max-[512px]:h-[385px] [&>*:first-child_.language-container>button:first-child]:whitespace-nowrap min-[240.1px]:max-[412px]:[&_.language-container]:flex-wrap min-[240.1px]:max-[412px]:[&_.language-container]:max-h-20">
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
            className="max-w-[549px] w-full max-h-[158px] h-full pt-5 text-base font-bold text-[#F9FAFB] border-t border-[#4d5562] resize-none outline-none max-lg:max-w-[832px] max-lg:w-full max-[412px]:pt-6"
          />
          <div className="flex justify-end items-center text-[#D2D5DA] text-xs font-medium mb-3 max-[359px]:text-[10px] max-[359px]:mb-10">{translatingText.length}/500</div>
          <div className="flex justify-between items-end max-[359px]:gap-[3px]">
            <div className="flex justify-center items-center gap-2 max-w-20 w-full max-[359px]:h-[27px] max-[359px]:gap-[2px] max-[359px]:w-auto">
              <TextToSpeech text={translatingText} lang={sourceLang} />
              <CopyText text={translatingText} />
            </div>
            <div>
              <TranslationButton onClick={handleTranslate} />
            </div>
          </div>
        </div>
        <div className="max-w-[597px] w-full h-[339px] border-[0.5px] border-[#4D5562] bg-[#121826] rounded-3xl p-6 max-lg:max-w-[880px]">
          {/* Set french as default translated text language && hide language detection button */}
          <LanguageSelection
            showDetectLanguage={false}
            defaultLanguage="fr"
            currentLang={targetLang} // pass active language on switch
            onLanguageChange={setTargetLang}
            showSwitchLanguage={true}
            onSwitch={handleSwitch}
          />
          <div className="max-w-[549px] w-full max-h-[158px] h-full pt-5 text-base font-bold text-[#F9FAFB] border-t border-[#394150] resize-none outline-none max-lg:max-w-[832px] max-lg:w-full max-[412px]:pt-6">
            <span className="block overflow-y-auto h-full">{translatedText}</span>
          </div>
          <div className="flex justify-between items-end mt-12">
            <div className="flex justify-center items-center gap-2 max-w-20 w-full max-[359px]:h-[27px] max-[359px]:gap-[2px] max-[359px]:w-auto">
              <TextToSpeech text={translatedText} lang={targetLang} />
              <CopyText text={translatedText} />
            </div>
          </div>
        </div>
      </div>
      <div>
          {errorEmpty && <p className="pt-[20px] text-center text-sm font-medium text-[#F87171] transition-opacity duration-300 ease-in-out">Enter your text</p>}
          {errorLanguageSelection && <p className="pt-[20px] text-center text-sm font-medium text-[#F87171] transition-opacity duration-300 ease-in-out">Languages must be different</p>}
      </div>
    </div>
  );
}