import { View } from 'react-native'
import React, { useState } from 'react'
import { Button } from '@rneui/themed'
import { Formik } from 'formik'
import { RegisterValidationSchema } from '../../utils/validation-schemas'
import { postData } from '../../utils/http-requests'
import { showStatusMessage } from '../../utils/general-functions'
import '../language_select/i18n'
import { useTranslation } from 'react-i18next'
import styles from '../../utils/styles'
import FormField from '../general_components/FormField'
import { checkForFalse } from '../../utils/general-functions'

export default function RegisterForm({ setLoginPage }) {
	const { t } = useTranslation()
	const [wasPressed, setWasPressed] = useState(false)

	const sendData = async (values) => {
		var data = {
			email: values.email,
			password: values.password,
			username: values.username,
		}
		if (values.name != '') data.name = values.name
		await postData(data, '/users/user', {
			onSuccess: async (response) => {
				console.log(response.data)
				showStatusMessage(response.data, 'success')
				setLoginPage(true)
			},
			onError: (error) => {
				setWasPressed(false)
				showStatusMessage(error.data, 'failure')
			},
		})
	}

	return (
		<Formik
			initialValues={{
				email: '',
				username: '',
				password: '',
				name: '',
			}}
			validationSchema={RegisterValidationSchema}
			validateOnMount={true}
			onSubmit={(values) => {
				setWasPressed(!wasPressed)
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
						required={true}
						largeField={false}
						placeholder={t('email')}
						handleChange={() => handleChange('email')}
						handleBlur={handleBlur('email')}
						errors={errors.email}
						touched={touched.email}
						value={values.email}
					/>
					<FormField
						hideText={false}
						required={true}
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
						required={true}
						largeField={false}
						placeholder={t('password')}
						handleChange={() => handleChange('password')}
						handleBlur={handleBlur('password')}
						errors={errors.password}
						touched={touched.password}
						value={values.password}
					/>
					<FormField
						hideText={false}
						required={false}
						largeField={false}
						placeholder={t('name')}
						handleChange={() => handleChange('name')}
						handleBlur={handleBlur('name')}
						errors={errors.name}
						touched={touched.name}
						value={values.name}
					/>
					<View style={styles.buttonStyle}>
						<Button
							name="button"
							title={t('register')}
							onPress={handleSubmit}
							disabled={checkForFalse(!isValid, wasPressed)}
						/>
					</View>
				</View>
			)}
		</Formik>
	)
}
