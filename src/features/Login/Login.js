import '../language_select/i18n'
import { useTranslation } from 'react-i18next'
import { Text, TouchableOpacity, ScrollView } from 'react-native'
import LoginForm from './LoginForm'
import styles from '../../utils/styles'

export default function Login({ setLoginPage, setLogin }) {
	const { t } = useTranslation()

	return (
		<ScrollView contentContainerStyle={styles.mainContainer}>
			<Text style={styles.largeHeader}>{t('login')}</Text>
			<LoginForm setLogin={setLogin} />
			<TouchableOpacity onPress={() => setLoginPage(false)}>
				<Text style={styles.hyperlink}>{t('gotoregister')}</Text>
			</TouchableOpacity>
		</ScrollView>
	)
}
