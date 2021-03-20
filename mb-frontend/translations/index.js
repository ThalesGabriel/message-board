import memoize from "lodash/memoize";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import { messages } from "./languages";

i18n
.use(LanguageDetector).init({
  debug: false,
  defaultNS: ["translations"],
  fallbackLng: "pt",
  ns: ["translations"],
  resources: messages,
})

export const translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key)
);
