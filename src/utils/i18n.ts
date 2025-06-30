import { EnumLanguage } from '@/models/enums/EnumLanguage';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    lng: EnumLanguage.EN,
    fallbackLng: EnumLanguage.EN,
    interpolation: {
      escapeValue: false,
    },
    ns: ['common'],
    defaultNS: 'common',
  });

export default i18n;
