import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const detectionOptions = {
  order: ['localStorage', 'navigator'],
  caches: ['localStorage'],
};

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: 'en', // if you're using a language detector, do not define the lng option
    detection: detectionOptions,
    debug: true,
    react: {
      useSuspense: true,
    },
    resources: {
      en: {
        translation: {
          key: 'hello world',
        },
      },
    },
  });

export default i18next;
