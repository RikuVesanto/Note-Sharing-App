import { View } from 'react-native'
import styles from '../../utils/styles'
import { Button } from '@rneui/themed'
import { Formik } from 'formik'
import { NoteValidationSchema } from '../../utils/validation-schemas'
import { putData } from '../../utils/http-requests'
import { showStatusMessage } from '../../utils/general-functions'
import { useTranslation } from 'react-i18next'
import '../language_select/i18n'
import {
	checkForFalse,
	CheckForShallowObjectEquality,
} from '../../utils/general-functions'
import React, { useState } from 'react'
import FormField from '../general_components/FormField'
import CloseButton from '../general_components/closeButton'

export default function EditNoteForm({
	id,
	title,
	content,
	refreshNotes,
	setRefreshNotes,
	notesStatus,
	setNotesStatus,
	orderCount,
}) {
	const { t } = useTranslation()
	const [wasPressed, setWasPressed] = useState(false)

	const sendData = async (values) => {
		var data = {
			content: values.content,
			noteId: id,
		}
		if (values.title != '') data.title = values.title
		await putData(data, `/notes/note/${id}`, {
			onSuccess: async (response) => {
				showStatusMessage(response.data, 'success')
				setRefreshNotes(!refreshNotes)
				let tempArray = notesStatus
				tempArray[orderCount] = false
				setNotesStatus(tempArray)
				setWasPressed(false)
			},
			onError: (error) => {
				setWasPressed(false)
				showStatusMessage(error.data, 'failure')
			},
		})
	}

	const initialValues = { title: title, content: content }
	return (
		<View style={styles.noteCard}>
			<CloseButton
				action={() => {
					setRefreshNotes(!refreshNotes)
					let tempArray = notesStatus
					tempArray[orderCount] = false
					setNotesStatus(tempArray)
				}}
			/>
			<Formik
				initialValues={initialValues}
				validationSchema={NoteValidationSchema}
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
							disabled={checkForFalse(
								checkForFalse(!isValid, wasPressed),
								CheckForShallowObjectEquality(
									values,
									initialValues
								)
							)}
						/>
					</View>
				)}
			</Formik>
		</View>
	)
}
