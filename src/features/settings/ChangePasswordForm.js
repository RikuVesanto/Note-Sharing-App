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
import { getUserId, doOnce } from '../../utils/general-functions'
import BackButton from '../general_components/BackButton'
import React from 'react'

export default function EditUserInfoForm({ setChangePassword }) {
	const { t } = useTranslation()
	let sendDataOnce = doOnce(sendData)

	async function sendData(values) {
		const userId = await getUserId()
		const data = {
			id: userId,
			oldPassword: values.oldPassword,
			password: values.password,
		}
		await putData(data, '/users/user/password', {
			onSuccess: async (response) => {
				showStatusMessage(response.data, 'success')
				setChangePassword(false)
			},
			onError: (error) => {
				sendDataOnce = doOnce(sendData)
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
					sendDataOnce(values)
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
								disabled={!isValid}
							/>
						</View>
					</View>
				)}
			</Formik>
		</View>
	)
}
