import { View } from 'react-native'
import { Button } from '@rneui/themed'
import { Formik } from 'formik'
import { LoginValidationSchema } from '../../utils/validation-schemas'
import { getData } from '../../utils/http-requests'
import { showStatusMessage, checkForFalse } from '../../utils/general-functions'
import '../language_select/i18n'
import { useTranslation } from 'react-i18next'
import styles from '../../utils/styles'
import FormField from '../general_components/FormField'
import AppStorage from '../../utils/secure-store'
import React, { useState } from 'react'

export default function LoginForm({ setLogin }) {
	const { t } = useTranslation()
	const [wasPressed, setWasPressed] = useState(false)

	const sendData = async (values) => {
		await getData(`/users/user/${values.username}/${values.password}`, {
			onSuccess: async (response) => {
				showStatusMessage('Login successful', 'success', 600)
				AppStorage.save('loginInfo', response.data)
				setLogin(true)
			},
			onError: (error) => {
				setWasPressed(false)
				console.log(error.status, error.data.message)
				showStatusMessage(error.data.message, 'failure')
			},
		})
	}

	return (
		<Formik
			initialValues={{
				username: '',
				password: '',
			}}
			validationSchema={LoginValidationSchema}
			validateOnMount={true}
			onSubmit={(values) => {
				setWasPressed(true)
				sendData(values)
			}}
		>
			{({
				handleChange,
				handleBlur,
				handleSubmit,
				errors,
				touched,
				isValid,
				values,
			}) => (
				<View>
					<FormField
						hideText={false}
						required={false}
						largeField={false}
						placeholder={t('username')}
						handleChange={() => handleChange('username')}
						handleBlur={handleBlur('username')}
						errors={errors.username}
						touched={touched.username}
						value={values.username}
					/>
					<FormField
						hideText={true}
						required={false}
						largeField={false}
						placeholder={t('password')}
						handleChange={() => handleChange('password')}
						handleBlur={handleBlur('password')}
						errors={errors.password}
						touched={touched.password}
						value={values.password}
					/>
					<View style={styles.buttonStyle}>
						<Button
							buttonStyle={styles.button}
							title={t('login')}
							onPress={handleSubmit}
							disabled={checkForFalse(!isValid, wasPressed)}
						/>
					</View>
				</View>
			)}
		</Formik>
	)
}
