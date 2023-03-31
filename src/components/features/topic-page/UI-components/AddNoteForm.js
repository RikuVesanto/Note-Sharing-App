import { View } from 'react-native'
import styles from '../../../../utils/styles'
import { Button } from '@rneui/themed'
import { Formik } from 'formik'
import { NoteValidationSchema } from '../../../../utils/validation-schemas'
import { useTranslation } from 'react-i18next'
import '../../../../utils/i18n'
import React from 'react'
import FormField from '../../../general-components/FormField'

export default function AddNoteForm({ action }) {
	const { t } = useTranslation()

	const emptyValues = { title: '', content: '' }
	return (
		<View style={styles.noteCard}>
			<Formik
				initialValues={emptyValues}
				validationSchema={NoteValidationSchema}
				validateOnMount={true}
				onSubmit={(values, actions) => {
					action(values)
					actions.setValues(emptyValues)
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
							placeholder={t('title')}
							handleChange={() => handleChange('title')}
							handleBlur={handleBlur('title')}
							errors={errors.title}
							touched={touched.title}
							value={values.title}
							minimalStyle={true}
							errorPosition={45}
							whiteText={true}
						/>
						<FormField
							hideText={false}
							required={false}
							largeField={true}
							placeholder={t('content')}
							handleChange={() => handleChange('content')}
							handleBlur={handleBlur('content')}
							errors={errors.content}
							touched={touched.content}
							value={values.content}
							minimalStyle={true}
							errorPosition={85}
							whiteText={true}
						/>
						<Button
							buttonStyle={[
								styles.button,
								styles.alternateButton,
								styles.marginTop,
							]}
							title={t('create_note')}
							onPress={handleSubmit}
							disabled={!isValid}
						/>
					</View>
				)}
			</Formik>
		</View>
	)
}
