import { View } from 'react-native'
import styles from '../../../../utils/styles'
import { Button } from '@rneui/themed'
import { Formik } from 'formik'
import { CreateTopicValidationSchema } from '../../../../utils/validation-schemas'
import { useTranslation } from 'react-i18next'
import '../../../../utils/i18n'
import {
	CheckForShallowObjectEquality,
	checkForFalse,
} from '../../../../functions/general-functions'
import React from 'react'
import FormField from '../../../general-components/FormField'
import CloseButton from '../../../general-components/CloseButton'

export default function EditNoteForm({
	topic,
	description,
	setEditTopic,
	action,
}) {
	const { t } = useTranslation()

	const initialValues = { topic: topic, description: description }
	return (
		<View style={[styles.headerForm, styles.marginBottom]}>
			<CloseButton action={() => setEditTopic(false)} />
			<Formik
				initialValues={initialValues}
				validationSchema={CreateTopicValidationSchema}
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
							placeholder={t('topic')}
							handleChange={() => handleChange('topic')}
							handleBlur={handleBlur('topic')}
							errors={errors.topic}
							touched={touched.topic}
							value={values.topic}
							minimalStyle={true}
							errorPosition={45}
							slimInputs={true}
						/>
						<FormField
							hideText={false}
							required={false}
							largeField={true}
							placeholder={t('description')}
							handleChange={() => handleChange('description')}
							handleBlur={handleBlur('description')}
							errors={errors.description}
							touched={touched.description}
							value={values.description}
							minimalStyle={true}
							errorPosition={85}
							slimInputs={true}
						/>

						<Button
							buttonStyle={[
								styles.button,
								styles.largeMarginTop,
								styles.marginBottom,
							]}
							title={t('edit_topic')}
							onPress={handleSubmit}
							disabled={checkForFalse(
								!isValid,
								CheckForShallowObjectEquality(values, initialValues)
							)}
						/>
					</View>
				)}
			</Formik>
		</View>
	)
}
