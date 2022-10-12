import { View, Text, TextInput } from 'react-native'
import styles from '../../utils/styles'
import { Button } from '@rneui/themed'
import { Formik } from 'formik'
import { TopicValidationSchema } from '../../utils/validation-schemas'
import { putData } from '../../utils/http-requests'
import { showStatusMessage } from '../../utils/general-functions'
import { useTranslation } from 'react-i18next'
import '../language_select/i18n'
import { checkForFalse } from '../../utils/general-functions'
import React, { useState } from 'react'

export default function EditNoteForm({
	topicId,
	topic,
	description,
	setRefreshTopics,
	refreshTopics,
	setEditTopic,
	setActiveTopic,
}) {
	const { t } = useTranslation()
	const [wasPressed, setWasPressed] = useState(false)

	const sendData = async (values) => {
		var data = {
			topic: values.topic,
			id: topicId,
		}
		if (values.description != '') data.description = values.description
		await putData(data, `/topics/topic/`, {
			onSuccess: async (response) => {
				showStatusMessage(response.data, 'success')
				setRefreshTopics(!refreshTopics)
				setEditTopic(false)
				setActiveTopic(data)
				setWasPressed(false)
			},
			onError: (error) => {
				setWasPressed(false)
				showStatusMessage(error.data, 'failure')
			},
		})
	}
	const checkForChanges = (values) => {
		return values.topic != initialValues.topic ||
			values.description != initialValues.description
			? false
			: true
	}

	const initialValues = { topic: topic, description: description }
	return (
		<View style={styles.topicEditFormContainer}>
			<Formik
				initialValues={initialValues}
				validationSchema={TopicValidationSchema}
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
						<View style={styles.noteContainer}>
							<TextInput
								style={[
									styles.noteInput,
									touched.topic &&
										errors &&
										styles.inputError,
								]}
								placeholder={t('topic')}
								onChangeText={handleChange('topic')}
								onBlur={handleBlur('topic')}
								value={values.topic}
							/>
							{errors && touched.topic && (
								<Text
									style={[
										styles.errorText,
										styles.titleErrorText,
									]}
								>
									{errors.topic}
								</Text>
							)}
						</View>
						<View style={styles.noteContainer}>
							<TextInput
								style={[
									styles.noteInput,
									styles.highInput,
									touched.description &&
										errors &&
										styles.inputError,
								]}
								multiline={true}
								placeholder={t('description')}
								onChangeText={handleChange('description')}
								onBlur={handleBlur('description')}
								value={values.description}
							/>
							{errors && touched.description && (
								<Text
									style={[
										styles.errorText,
										styles.contentErrorText,
									]}
								>
									{errors.description}
								</Text>
							)}
						</View>
						<View style={styles.noteSubmitButton}>
							<Button
								title={t('create_note')}
								onPress={handleSubmit}
								disabled={checkForFalse(
									checkForFalse(!isValid, wasPressed),
									checkForChanges(values)
								)}
							/>
						</View>
					</View>
				)}
			</Formik>
		</View>
	)
}