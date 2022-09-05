import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import english from '../../../languages/en.json'
import finnish from '../../../languages/fi.json'
import AppStorage from '../../utils/secure-store'

AppStorage.getValueFor('language').then((language) =>
  i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    lng: language,
    fallbackLng: 'en',
    resources: {
      en: english,
      fi: finnish,
    },
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  })
)

export default i18n
