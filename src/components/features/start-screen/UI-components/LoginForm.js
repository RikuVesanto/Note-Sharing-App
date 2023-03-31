import { View } from 'react-native'
import { Button } from '@rneui/themed'
import { Formik } from 'formik'
import { LoginValidationSchema } from '../../../../utils/validation-schemas'
import '../../../../utils/i18n'
import { useTranslation } from 'react-i18next'
import styles from '../../../../utils/styles'
import FormField from '../../../general_components/FormField'

import React from 'react'

export default function LoginForm({ action }) {
	const { t } = useTranslation()

	return (
		<Formik
			initialValues={{
				username: '',
				password: '',
			}}
			validationSchema={LoginValidationSchema}
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
							disabled={!isValid}
						/>
					</View>
				</View>
			)}
		</Formik>
	)
}
