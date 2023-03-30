import { View, Text } from 'react-native'
import { Button } from '@rneui/themed'
import { Formik } from 'formik'
import { ChangePasswordValidationSchema } from '../../../utils/validation-schemas'
import '../../../utils/i18n'
import { useTranslation } from 'react-i18next'
import styles from '../../../utils/styles'
import FormField from '../../general_components/FormField'
import BackButton from '../../general_components/BackButton'
import React from 'react'

export default function EditUserInfoForm({ setChangePassword, action }) {
	const { t } = useTranslation()

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
					action(values)
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
