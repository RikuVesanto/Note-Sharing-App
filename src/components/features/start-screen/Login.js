import '../../../utils/i18n'
import { useTranslation } from 'react-i18next'
import { Text, TouchableOpacity, ScrollView } from 'react-native'
import LoginForm from './LoginForm'
import styles from '../../../utils/styles'
import AppStorage from '../../../utils/secure-store'
import { showStatusMessage } from '../../../functions/general-functions'
import { doOnce } from '../../../functions/general-functions'
import { checkLoginDetails } from '../../../functions/http_functions/get-calls'

export default function Login({ setLoginPage, setLogin }) {
	const { t } = useTranslation()
	let submitFormOnce = doOnce(submitForm)

	function submitForm(values) {
		checkLoginDetails(values).then((response) => {
			if (response.status === 200) {
				showStatusMessage('Login successful', 'success', 600)
				AppStorage.save('loginInfo', response.data)
				setLogin(true)
			} else {
				showStatusMessage(response.data.message, 'failure')
			}
		})
	}

	return (
		<ScrollView contentContainerStyle={styles.mainContainer}>
			<Text style={styles.largeHeader}>{t('login')}</Text>
			<LoginForm setLogin={setLogin} action={submitFormOnce} />
			<TouchableOpacity onPress={() => setLoginPage(false)}>
				<Text style={styles.hyperlink}>{t('gotoregister')}</Text>
			</TouchableOpacity>
		</ScrollView>
	)
}
