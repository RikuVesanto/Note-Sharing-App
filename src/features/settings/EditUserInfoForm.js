import { View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Button } from '@rneui/themed'
import { Formik } from 'formik'
import { EditUserInfoValidationSchema } from '../../utils/validation-schemas'
import { getData, putData } from '../../utils/http-requests'
import { showStatusMessage, checkForFalse } from '../../utils/general-functions'
import '../language_select/i18n'
import { useTranslation } from 'react-i18next'
import styles from '../../utils/styles'
import FormField from '../general_components/FormField'
import AppStorage from '../../utils/secure-store'
import jwt_decode from 'jwt-decode'

export default function EditUserInfoForm() {
	const { t } = useTranslation()
	const [currentValues, setCurrentValues] = useState([])

	useEffect(() => {
		fetchUserData()
	}, [])

	const fetchUserData = async () => {
		let userInfo = await AppStorage.getValueFor('loginInfo')
		let decoded = jwt_decode(userInfo)

		await getData(`/users/user/${decoded.id}`, {
			onSuccess: (response) => {
				//console.log(response.data)
				setCurrentValues(response.data)
			},
			onError: (error) => {
				console.log(error)
			},
		})
	}

	const sendData = async (values) => {
		let userInfo = await AppStorage.getValueFor('loginInfo')
		let decoded = jwt_decode(userInfo)
		let data = {
			id: decoded.id,
			email: values.email,
			username: values.username,
			name: values.name,
			school: values.school,
		}
		await putData(data, '/users/user', {
			onSuccess: async (response) => {
				showStatusMessage(response.data, 'success')
				fetchUserData()
			},
			onError: (error) => {
				showStatusMessage(error.data, 'failure')
			},
		})
	}

	const checkForChanges = (values, otherValues) => {
		return values.email != currentValues.email ||
			values.username != currentValues.username ||
			values.name != currentValues.name ||
			values.school != currentValues.school
			? true
			: false
	}

	return (
		<Formik
			initialValues={{
				email: currentValues.email,
				username: currentValues.username,
				name: currentValues.name,
				school: currentValues.school,
			}}
			enableReinitialize={true}
			validationSchema={EditUserInfoValidationSchema}
			validateOnMount={true}
			onSubmit={(values) => {
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
					<FormField
						hideText={false}
						required={false}
						largeField={false}
						placeholder={t('school')}
						handleChange={() => handleChange('school')}
						handleBlur={handleBlur('school')}
						errors={errors.school}
						touched={touched.school}
						value={values.school}
					/>
					<View style={styles.buttonStyle}>
						<Button
							name="button"
							title={t('edit')}
							onPress={handleSubmit}
							disabled={checkForFalse(
								!isValid,
								!checkForChanges(values)
							)}
						/>
					</View>
				</View>
			)}
		</Formik>
	)
}