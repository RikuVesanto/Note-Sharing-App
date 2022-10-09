import { View, Text, TextInput } from 'react-native'
import styles from '../../utils/styles'
import { Button } from '@rneui/themed'
import { Formik } from 'formik'
import { NoteValidationSchema } from '../../utils/validation-schemas'
import { putData } from '../../utils/http-requests'
import { showStatusMessage } from '../../utils/general-functions'
import { useTranslation } from 'react-i18next'
import '../language_select/i18n'

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
			},
			onError: (error) => {
				showStatusMessage(error.data, 'failure')
			},
		})
	}
	return (
		<View style={styles.noteCard}>
			<Formik
				initialValues={{ title: title, content: content }}
				validationSchema={NoteValidationSchema}
				validateOnMount={true}
				onSubmit={(values) => {
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
						<View style={styles.noteContainer}>
							<TextInput
								style={[
									styles.noteInput,
									touched.title &&
										errors &&
										styles.inputError,
								]}
								placeholder={t('title')}
								onChangeText={handleChange('title')}
								onBlur={handleBlur('title')}
								value={values.title}
							/>
							{errors && touched.title && (
								<Text
									style={[
										styles.errorText,
										styles.titleErrorText,
									]}
								>
									{errors.title}
								</Text>
							)}
						</View>
						<View style={styles.noteContainer}>
							<TextInput
								style={[
									styles.noteInput,
									styles.highInput,
									touched.content &&
										errors &&
										styles.inputError,
								]}
								multiline={true}
								placeholder={t('content')}
								onChangeText={handleChange('content')}
								onBlur={handleBlur('content')}
								value={values.content}
							/>
							{errors && touched.content && (
								<Text
									style={[
										styles.errorText,
										styles.contentErrorText,
									]}
								>
									{errors.content}
								</Text>
							)}
						</View>
						<View style={styles.noteSubmitButton}>
							<Button
								title={t('create_note')}
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
