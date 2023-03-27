import { View } from 'react-native'
import styles from '../../utils/styles'
import { Button } from '@rneui/themed'
import { Formik } from 'formik'
import { CreateGroupValidationSchema } from '../../utils/validation-schemas'
import { putData } from '../../utils/http-requests'
import { showStatusMessage } from '../../utils/general-functions'
import { useTranslation } from 'react-i18next'
import '../language_select/i18n'
import {
	checkForFalse,
	CheckForShallowObjectEquality,
} from '../../utils/general-functions'
import { filterObject } from '../../utils/object-functions'
import React, { useState } from 'react'
import FormField from '../general_components/FormField'
import CloseButton from '../general_components/closeButton'
import { useNavigation } from '@react-navigation/native'

export default function EditGroupInfoForm({
	id,
	name,
	description,
	setEditGroupInfo,
	setRefreshGroups,
	refreshGroups,
	setNeedToNavigate,
	setNavigate,
}) {
	const navigation = useNavigation()
	const { t } = useTranslation()
	const [wasPressed, setWasPressed] = useState(false)
	const sendData = async (values) => {
		const groupData = filterObject(
			{
				...values,
				groupId: id,
			},
			(value) => value !== ''
		)
		await putData(groupData, `/groups/group/`, {
			onSuccess: async (response) => {
				showStatusMessage(response.data, 'success')
				setNeedToNavigate(true)
				const object = {}
				object.navigate = () => {
					setNeedToNavigate(false)
					navigation.navigate(data.name)
				}
				setNavigate(object)
				setRefreshGroups(!refreshGroups)
				setEditGroupInfo(false)
				setWasPressed(false)
			},
			onError: (error) => {
				setWasPressed(false)
				showStatusMessage(error.data, 'failure')
			},
		})
	}
	const initialValues = { name: name, description: description }

	return (
		<View style={styles.headerForm}>
			<CloseButton action={() => setEditGroupInfo(false)} />

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
						<FormField
							hideText={false}
							required={false}
							largeField={false}
							placeholder={t('name')}
							handleChange={() => handleChange('name')}
							handleBlur={handleBlur('name')}
							errors={errors.name}
							touched={touched.name}
							value={values.name}
							minimalStyle={true}
							errorPosition={45}
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
						/>
						<Button
							buttonStyle={[
								styles.button,
								styles.marginBottom,
								styles.largeMarginTop,
							]}
							title={t('edit_group_name')}
							onPress={handleSubmit}
							disabled={checkForFalse(
								checkForFalse(!isValid, wasPressed),
								CheckForShallowObjectEquality(values, initialValues)
							)}
						/>
					</View>
				)}
			</Formik>
		</View>
	)
}
