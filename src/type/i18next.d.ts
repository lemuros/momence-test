import "i18next";
import { enDictionary } from "../dictionary/en";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation";
    resources: {
      translation: typeof enDictionary;
    };
  }
}
