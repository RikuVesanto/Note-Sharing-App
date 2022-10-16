import { Text, TouchableOpacity, ScrollView } from 'react-native'
import RegisterForm from './RegisterForm'
import '../language_select/i18n'
import { useTranslation } from 'react-i18next'
import styles from '../../utils/styles'

export default function Register({ setLoginPage }) {
	const { t } = useTranslation()
	return (
		<ScrollView contentContainerStyle={styles.mainContainer}>
			<Text style={styles.largeHeader}>{t('register')}</Text>
			<RegisterForm setLoginPage={setLoginPage} />
			<TouchableOpacity onPress={() => setLoginPage(true)}>
				<Text style={styles.hyperlink}>{t('gotologin')}</Text>
			</TouchableOpacity>
		</ScrollView>
	)
}
