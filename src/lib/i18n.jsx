import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../constant/locales/en.json";
import id from "../constant/locales/id.json";

i18n.use(initReactI18next).init({
  debug: true,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  resources: {
    en: {
      translation: en,
    },
    id: {
      translation: id,
    },
  },
});

export default i18n;
