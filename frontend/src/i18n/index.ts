import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import uk from './locales/uk.json';
import en from './locales/en.json';

const STORAGE_KEY = 'husto_lang';

const getInitialLanguage = (): string => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved === 'uk' || saved === 'en') {
      return saved;
    }
  } catch {
    // ignore storage errors
  }

  return 'en';
};

i18n.use(initReactI18next).init({
  resources: {
    uk: { translation: uk },
    en: { translation: en },
  },
  lng: getInitialLanguage(),
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

i18n.on('languageChanged', (lng: string) => {
  try {
    localStorage.setItem(STORAGE_KEY, lng);
  } catch {
    // ignore storage errors
  }
});

export default i18n;
