import { View, Text, TextInput } from 'react-native'
import styles from '../../utils/styles'
import { Button } from '@rneui/themed'
import { Formik } from 'formik'
import { CreateGroupValidationSchema } from '../../utils/validation-schemas'
import { putData } from '../../utils/http-requests'
import { showStatusMessage } from '../../utils/general-functions'
import { useTranslation } from 'react-i18next'
import '../language_select/i18n'
import { checkForFalse } from '../../utils/general-functions'
import React, { useState } from 'react'

export default function EditGroupInfoForm({
	id,
	name,
	description,
	setEditGroupInfo,
	setRefreshGroups,
	refreshGroups,
}) {
	const { t } = useTranslation()
	const [wasPressed, setWasPressed] = useState(false)
	const sendData = async (values) => {
		var data = {
			name: values.name,
			groupId: id,
		}
		if (values.description != '') data.description = values.description
		await putData(data, `/groups/group/`, {
			onSuccess: async (response) => {
				showStatusMessage(response.data, 'success')
				setEditGroupInfo(false)
				setRefreshGroups(!refreshGroups)
				setWasPressed(false)
			},
			onError: (error) => {
				setWasPressed(false)
				showStatusMessage(error.data, 'failure')
			},
		})
	}
	const initialValues = { name: name, description: description }

	const checkForChanges = (values) => {
		return values.name != initialValues.name ||
			values.description != initialValues.description
			? false
			: true
	}

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={CreateGroupValidationSchema}
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
								touched.name && errors && styles.inputError,
							]}
							placeholder={t('name')}
							onChangeText={handleChange('name')}
							onBlur={handleBlur('name')}
							value={values.name}
						/>
						{errors && touched.name && (
							<Text
								style={[
									styles.errorText,
									styles.titleErrorText,
								]}
							>
								{errors.name}
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
	)
}
