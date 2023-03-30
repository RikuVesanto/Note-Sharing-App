import React from 'react'
import { View } from 'react-native'
import { Button } from '@rneui/themed'
import { Formik } from 'formik'
import { SearchValidationSchema } from '../../../utils/validation-schemas'
import '../../../utils/i18n'
import { useTranslation } from 'react-i18next'
import styles from '../../../utils/styles'
import FormField from '../../general_components/FormField'

export default function GroupSearchForm({ action }) {
	const { t } = useTranslation()

	return (
		<Formik
			initialValues={{
				search: '',
			}}
			validationSchema={SearchValidationSchema}
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
						placeholder={t('group_name')}
						handleChange={() => handleChange('search')}
						handleBlur={handleBlur('search')}
						errors={errors.search}
						touched={touched.search}
						value={values.search}
					/>
					<View style={styles.buttonStyle}>
						<Button
							buttonStyle={styles.button}
							title={t('search')}
							onPress={handleSubmit}
							disabled={!isValid}
						/>
					</View>
				</View>
			)}
		</Formik>
	)
}
