import '../language_select/i18n'
import { useTranslation } from 'react-i18next'
import {
	Text,
	TouchableOpacity,
	ScrollView,
	ImageBackground,
	View,
} from 'react-native'
import React, { useState } from 'react'
import styles from '../../utils/styles'
import AppStorage from '../../utils/secure-store'
import EditUserInfoForm from './EditUserInfoForm'
import ChangePasswordForm from './ChangePasswordForm'
import ChangeLanguage from '../../features/language_select/ChangeLanguage'

export default function Settings({ setLogin }) {
	const { t } = useTranslation()
	const [changePassword, setChangePassword] = useState(false)

	return (
		<ScrollView contentContainerStyle={styles.registerContainer}>
			{changePassword ? (
				<ChangePasswordForm setChangePassword={setChangePassword} />
			) : (
				<View>
					<Text style={styles.headerStyle}>{t('settings')}</Text>
					<TouchableOpacity
						onPress={() => {
							AppStorage.save('loginInfo', '')
							setLogin(false)
						}}
					>
						<ImageBackground
							style={styles.logoutButton}
							source={require('../../../assets/logout.png')}
							resizeMode="center"
						></ImageBackground>
					</TouchableOpacity>
					<EditUserInfoForm />
					<TouchableOpacity onPress={() => setChangePassword(true)}>
						<Text style={styles.hyperlink}>
							{t('change_password')}
						</Text>
					</TouchableOpacity>
					<ChangeLanguage />
				</View>
			)}
		</ScrollView>
	)
}
