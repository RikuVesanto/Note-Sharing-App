import { View, Text, Modal } from 'react-native'
import '../language_select/i18n'
import { useTranslation } from 'react-i18next'
import styles from '../../utils/styles'
import localStyles from './addTopicForm.style'
import { Button } from '@rneui/themed'
import { Formik } from 'formik'
import { CreateTopicValidationSchema } from '../../utils/validation-schemas'
import { postData } from '../../utils/http-requests'
import { showStatusMessage, doOnce } from '../../utils/general-functions'
import BackButton from '../general_components/BackButton'
import FormField from '../general_components/FormField'
import { filterObject } from '../../utils/object-functions'
import React from 'react'

export default function NewTopicForm({
	newTopicFormVisible,
	setNewTopicFormVisible,
	groupId,
	refreshTopics,
	setRefreshTopics,
}) {
	const { t } = useTranslation()
	let sendDataOnce = doOnce(sendData)

	async function sendData(values) {
		const topicData = filterObject(
			{
				...values,
				groupId: groupId,
			},
			(value) => value !== ''
		)
		await postData(topicData, '/topics/topic', {
			onSuccess: async (response) => {
				showStatusMessage(response.data, 'success')
				setRefreshTopics(!refreshTopics)
				setNewTopicFormVisible(false)
				sendDataOnce = doOnce(sendData)
			},
			onError: (error) => {
				sendDataOnce = doOnce(sendData)
				showStatusMessage(error.data.message, 'failure')
			},
		})
	}

	return (
		<Modal
			animationType="fade"
			visible={newTopicFormVisible}
			onBackButtonPress={() => setNewTopicFormVisible(false)}
			onRequestClose={() => {
				setNewTopicFormVisible(false)
			}}
			transparent={true}
			hasBackdrop={false}
		>
			<View style={localStyles.modal}>
				<View style={styles.rowLayout}>
					<BackButton action={setNewTopicFormVisible} />
					<Text style={localStyles.formTitle}>{t('new_topic')}</Text>
				</View>
				<Formik
					initialValues={{
						topic: '',
						description: '',
					}}
					validationSchema={CreateTopicValidationSchema}
					validateOnMount={true}
					onSubmit={(values) => {
						sendDataOnce(values)
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
								placeholder={t('topic')}
								handleChange={() => handleChange('topic')}
								handleBlur={handleBlur('topic')}
								errors={errors.topic}
								touched={touched.topic}
								value={values.topic}
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
							/>
							<View style={styles.buttonStyle}>
								<Button
									buttonStyle={styles.button}
									title={t('create_topic')}
									onPress={handleSubmit}
									disabled={!isValid}
								/>
							</View>
						</View>
					)}
				</Formik>
			</View>
		</Modal>
	)
}
