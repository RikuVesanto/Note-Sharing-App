import { View, Text } from 'react-native'
import { Button } from '@rneui/themed'
import { Formik } from 'formik'
import { ChangePasswordValidationSchema } from '../../utils/validation-schemas'
import { putData } from '../../utils/http-requests'
import { showStatusMessage } from '../../utils/general-functions'
import '../language_select/i18n'
import { useTranslation } from 'react-i18next'
import styles from '../../utils/styles'
import FormField from '../general_components/FormField'
import { getUserId } from '../../utils/general-functions'
import BackButton from '../general_components/BackButton'
import { checkForFalse } from '../../utils/general-functions'
import React, { useState } from 'react'

export default function EditUserInfoForm({ setChangePassword }) {
	const { t } = useTranslation()
	const [wasPressed, setWasPressed] = useState(false)

	const sendData = async (values) => {
		let userId = await getUserId()
		let data = {
			id: userId,
			oldPassword: values.oldPassword,
			password: values.password,
		}
		await putData(data, '/users/user/password', {
			onSuccess: async (response) => {
				console.log(response.data)
				showStatusMessage(response.data, 'success')
				setChangePassword(false)
				setWasPressed(false)
			},
			onError: (error) => {
				setWasPressed(false)
				showStatusMessage(error.data, 'failure')
			},
		})
	}

	return (
		<View>
			<View style={styles.rowLayout}>
				<BackButton action={setChangePassword} />
				<Text style={[styles.mediumHeader, styles.marginBottom]}>
					{t('change_password')}
				</Text>
			</View>
			<Formik
				initialValues={{
					oldPassword: '',
					password: '',
				}}
				validationSchema={ChangePasswordValidationSchema}
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
							hideText={true}
							required={true}
							largeField={false}
							placeholder={t('old_password')}
							handleChange={() => handleChange('oldPassword')}
							handleBlur={handleBlur('oldPassword')}
							errors={errors.oldPassword}
							touched={touched.oldPassword}
							value={values.oldPassword}
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
						<View style={styles.buttonStyle}>
							<Button
								buttonStyle={styles.button}
								name="button"
								title={t('edit')}
								onPress={handleSubmit}
								disabled={checkForFalse(!isValid, wasPressed)}
							/>
						</View>
					</View>
				)}
			</Formik>
		</View>
	)
}
