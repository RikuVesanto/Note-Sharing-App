import {
	View,
	TextInput,
	Keyboard,
	TouchableOpacity,
	ImageBackground,
} from 'react-native'
import React, { useState } from 'react'
import { Button } from '@rneui/themed'
import { Formik } from 'formik'
import { RegisterValidationSchema } from '../../utils/validation-schemas'
import { postData } from '../../utils/http-requests'
import { showStatusMessage } from '../../utils/general-functions'
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'
import '../language_select/i18n'
import { useTranslation } from 'react-i18next'
import styles from '../../utils/styles'
import FormField from '../general_components/FormField'

export default function RegisterForm({ setLoginPage }) {
	const { t } = useTranslation()
	const [stateBirthday, setStateBirthday] = useState(null)
	const [showDatePicker, setShowDatePicker] = useState(false)

	// Updates birthday value to state and hides the date picker
	const onBirthdayChange = (selectedDate) => {
		if (selectedDate.type !== 'dismissed') {
			setStateBirthday(new Date(selectedDate.nativeEvent.timestamp))
		}
		setShowDatePicker(false)
		Keyboard.dismiss()
	}

	const sendData = async (values) => {
		var data = {
			email: values.email,
			password: values.password,
			username: values.username,
		}
		if (values.name != '') data.name = values.name
		if (values.school != '') data.school = values.school
		if (stateBirthday) data.birthday = stateBirthday.toISOString()
		await postData(data, '/users/user', {
			onSuccess: async (response) => {
				console.log(response.data)
				showStatusMessage(response.data, 'success')
				setLoginPage(true)
			},
			onError: (error) => {
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
				school: '',
			}}
			validationSchema={RegisterValidationSchema}
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
					<View style={styles.inputContainer}>
						<View style={styles.reveal}>
							<TouchableOpacity
								title="clear"
								onPress={() => setStateBirthday(null)}
							>
								<ImageBackground
									style={styles.formFieldImage}
									source={require('../../../assets/delete_icon.png')}
									resizeMode="center"
								></ImageBackground>
							</TouchableOpacity>
						</View>
						<TextInput
							style={styles.input}
							placeholder={t('birthday')}
							value={
								stateBirthday
									? moment(stateBirthday).format('DD.MM.Y')
									: ''
							}
							onTouchEnd={() => setShowDatePicker(true)} // Opens date picker when clicked (touched)
						/>
						{showDatePicker && (
							<DateTimePicker
								value={
									stateBirthday ? stateBirthday : new Date()
								}
								mode="date"
								onChange={onBirthdayChange}
							/>
						)}
					</View>
					<View style={styles.buttonStyle}>
						<Button
							name="button"
							title={t('register')}
							onPress={handleSubmit}
							disabled={!isValid}
						/>
					</View>
				</View>
			)}
		</Formik>
	)
}
