import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from '../../languages/en.json'
import fi from '../../languages/fi.json'
import AppStorage from './secure-store'

i18n.use(initReactI18next).init({
	compatibilityJSON: 'v3',
	resources: {
		en: {
			translation: en,
		},
		fi: {
			translation: fi,
		},
	},
	lng: 'en',
	fallbackLng: 'en',
	interpolation: {
		escapeValue: false,
	},
})

AppStorage.getValueFor('language').then((language) => {
	i18n.changeLanguage(language)
})

export default i18n
