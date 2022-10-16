import { View } from 'react-native'
import styles from '../../utils/styles'
import { Button } from '@rneui/themed'
import { Formik } from 'formik'
import { CreateTopicValidationSchema } from '../../utils/validation-schemas'
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

	const initialValues = { topic: topic, description: description }
	return (
		<View style={[styles.headerForm, styles.marginBottom]}>
			<CloseButton action={() => setEditTopic(false)} />
			<Formik
				initialValues={initialValues}
				validationSchema={CreateTopicValidationSchema}
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
								styles.marginTop,
								styles.marginBottom,
							]}
							title={t('edit_topic')}
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
