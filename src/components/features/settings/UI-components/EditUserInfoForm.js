import { View } from 'react-native'
import React from 'react'
import { Button } from '@rneui/themed'
import { Formik } from 'formik'
import { EditUserInfoValidationSchema } from '../../../../utils/validation-schemas'
import {
	CheckForShallowObjectEquality,
	checkForFalse,
} from '../../../../functions/general-functions'
import '../../../../utils/i18n'
import { useTranslation } from 'react-i18next'
import styles from '../../../../utils/styles'
import FormField from '../../../general-components/FormField'

export default function EditUserInfoForm({ currentValues, action }) {
	const { t } = useTranslation()

	const initialValues = {
		email: currentValues.email,
		username: currentValues.username,
		name: currentValues.name,
	}

	return (
		<Formik
			initialValues={initialValues}
			enableReinitialize={true}
			validationSchema={EditUserInfoValidationSchema}
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
					<View style={styles.buttonStyle}>
						<Button
							buttonStyle={styles.button}
							name="button"
							title={t('edit')}
							onPress={handleSubmit}
							disabled={checkForFalse(
								!isValid,
								CheckForShallowObjectEquality(values, initialValues)
							)}
						/>
					</View>
				</View>
			)}
		</Formik>
	)
}
