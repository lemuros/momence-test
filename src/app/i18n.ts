import i18next from "i18next";
import { csDictionary } from "../dictionary/cs";
import { enDictionary } from "../dictionary/en";
import { initReactI18next } from "react-i18next";

i18next.use(initReactI18next).init({
  resources: {
    cs: {
      translation: csDictionary,
    },
    en: {
      translation: enDictionary,
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});
