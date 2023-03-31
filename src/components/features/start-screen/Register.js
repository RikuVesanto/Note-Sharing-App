import { Text, TouchableOpacity, ScrollView } from 'react-native'
import RegisterForm from './RegisterForm'
import '../../../utils/i18n'
import { useTranslation } from 'react-i18next'
import styles from '../../../utils/styles'
import {
	showStatusMessage,
	delaySecondExecution,
} from '../../../functions/general-functions'
import { addUser } from '../../../functions/http_functions/post-calls'

export default function Register({ setLoginPage }) {
	const { t } = useTranslation()
	const submitSignupFormWithBreak = delaySecondExecution(submitSignupForm)

	function submitSignupForm(values) {
		addUser(values).then((response) => {
			if (response.status === 201) {
				showStatusMessage(response.data, 'success')
				setLoginPage(true)
			} else {
				showStatusMessage(response.data, 'failure')
			}
		})
	}

	return (
		<ScrollView contentContainerStyle={styles.mainContainer}>
			<Text style={styles.largeHeader}>{t('register')}</Text>
			<RegisterForm
				setLoginPage={setLoginPage}
				action={submitSignupFormWithBreak}
			/>
			<TouchableOpacity onPress={() => setLoginPage(true)}>
				<Text style={styles.hyperlink}>{t('gotologin')}</Text>
			</TouchableOpacity>
		</ScrollView>
	)
}
