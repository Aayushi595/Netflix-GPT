// hooks/useLanguage.js
import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";

const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }

  const { lang, setLang } = context;

  const changeLanguage = (newLang) => {
    setLang(newLang);
  };

  return { lang, changeLanguage };
};

export default useLanguage;