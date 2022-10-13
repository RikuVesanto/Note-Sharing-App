import { View, Text, TextInput } from 'react-native'
import styles from '../../utils/styles'
import { Button } from '@rneui/themed'
import { Formik } from 'formik'
import { NoteValidationSchema } from '../../utils/validation-schemas'
import { postData } from '../../utils/http-requests'
import { showStatusMessage } from '../../utils/general-functions'
import { useTranslation } from 'react-i18next'
import '../language_select/i18n'
import { checkForFalse } from '../../utils/general-functions'
import React, { useState } from 'react'
import FormField from '../general_components/FormField'

export default function AddNoteForm({
	id,
	refreshNotes,
	setRefreshNotes,
	closeNoteForms,
}) {
	const { t } = useTranslation()
	const [wasPressed, setWasPressed] = useState(false)

	const sendData = async (values) => {
		var data = {
			content: values.content,
			topicId: id,
		}
		if (values.title != '') data.title = values.title
		await postData(data, '/notes/note/', {
			onSuccess: async (response) => {
				showStatusMessage(response.data, 'success')
				setRefreshNotes(!refreshNotes)
				closeNoteForms()
				setWasPressed(false)
			},
			onError: (error) => {
				setWasPressed(false)
				showStatusMessage(error.data.message, 'failure')
			},
		})
	}
	const emptyValues = { title: '', content: '' }
	return (
		<View style={styles.noteCard}>
			<Formik
				initialValues={emptyValues}
				validationSchema={NoteValidationSchema}
				validateOnMount={true}
				onSubmit={(values, actions) => {
					setWasPressed(true)
					sendData(values)
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
						/>
						<View style={styles.noteSubmitButton}>
							<Button
								title={t('create_note')}
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
