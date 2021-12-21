import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

const detectionOptions = {
  order: ['localStorage', 'navigator'],
  caches: ['localStorage'],
};

const languages = [{ key: 'en-US', label: 'EN' }];

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(HttpApi)
  .init({
    ns: 'common',
    load: languages,
    detection: detectionOptions,
    fallbackLng: 'en',
    debug: false,
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
  });

export default i18next;
