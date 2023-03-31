import '../../../utils/i18n'
import { useTranslation } from 'react-i18next'
import {
	Text,
	TouchableOpacity,
	ScrollView,
	ImageBackground,
	View,
} from 'react-native'
import {
	getUserId,
	delaySecondExecution,
	showStatusMessage,
} from '../../../functions/general-functions'
import React, { useState, useEffect } from 'react'
import styles from '../../../utils/styles'
import AppStorage from '../../../utils/secure-store'
import EditUserInfoForm from './EditUserInfoForm'
import ChangePasswordForm from './ChangePasswordForm'
import ChangeLanguage from '../../general_components/ChangeLanguage'
import {
	changeUsersPassword,
	changeUserInfo,
} from '../../../functions/http_functions/put-calls'
import { getUserInfo } from '../../../functions/http_functions/get-calls'

export default function Settings({ setLogin }) {
	const { t } = useTranslation()
	const postPasswordWithBreak = delaySecondExecution(postPasswordForm)
	const postUserInfoWithBreak = delaySecondExecution(postUserInfoForm)

	const [changePassword, setChangePassword] = useState(false)
	const [currentValues, setCurrentValues] = useState([])
	const [refreshUserData, setRefreshUserData] = useState(false)

	useEffect(() => {
		;(async () => {
			const userId = await getUserId()
			const response = await getUserInfo(userId)
			if ((response.status = 200)) {
				setCurrentValues(response.data)
			}
		})()
	}, [refreshUserData])

	async function postPasswordForm(values) {
		const userId = await getUserId()
		const response = await changeUsersPassword(values, userId)
		if (response.status === 201) {
			showStatusMessage(response.data, 'success')
			setChangePassword(false)
		} else {
			showStatusMessage(response.data, 'failure')
		}
	}

	async function postUserInfoForm(values) {
		const userId = await getUserId()
		const response = await changeUserInfo(values, userId)
		if (response.status === 201) {
			showStatusMessage(response.data, 'success')
			setRefreshUserData(!refreshUserData)
		} else {
			showStatusMessage(response.data, 'failure')
		}
	}

	return (
		<ScrollView contentContainerStyle={styles.mainContainer}>
			{changePassword ? (
				<ChangePasswordForm
					setChangePassword={setChangePassword}
					action={postPasswordWithBreak}
				/>
			) : (
				<View>
					<Text
						style={[
							styles.mediumHeader,
							styles.centerText,
							styles.marginBottom,
						]}
					>
						{t('settings')}
					</Text>
					<TouchableOpacity
						onPress={() => {
							AppStorage.save('loginInfo', '')
							setLogin(false)
						}}
					>
						<ImageBackground
							style={styles.logoutButton}
							source={require('../../../../assets/logout.png')}
							resizeMode="center"
						></ImageBackground>
					</TouchableOpacity>
					<EditUserInfoForm
						currentValues={currentValues}
						action={postUserInfoWithBreak}
					/>
					<TouchableOpacity onPress={() => setChangePassword(true)}>
						<Text style={styles.hyperlink}>{t('change_password')}</Text>
					</TouchableOpacity>
					<ChangeLanguage />
				</View>
			)}
		</ScrollView>
	)
}
