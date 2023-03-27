import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { Button } from '@rneui/themed'
import { Formik } from 'formik'
import { CreateGroupValidationSchema } from '../../utils/validation-schemas'
import { postData } from '../../utils/http-requests'
import { showStatusMessage } from '../../utils/general-functions'
import '../language_select/i18n'
import { useTranslation } from 'react-i18next'
import styles from '../../utils/styles'
import FormField from '../general_components/FormField'
import BackButton from '../general_components/BackButton'
import { useNavigation } from '@react-navigation/native'
import { getUserId } from '../../utils/general-functions'
import { checkForFalse } from '../../utils/general-functions'
import { filterObject } from '../../utils/object-functions'

export default function CreateGroupForm({
	setCreateGroup,
	setNeedToNavigate,
	refreshGroups,
	setRefreshGroups,
	setNavigate,
}) {
	const navigation = useNavigation()
	const { t } = useTranslation()
	const [wasPressed, setWasPressed] = useState(false)

	const sendData = async (values) => {
		const userId = await getUserId()
		const groupData = filterObject(
			{
				...values,
				creatorId: userId,
			},
			(value) => value !== ''
		)
		await postData(groupData, '/groups/group', {
			onSuccess: async (response) => {
				showStatusMessage(response.data, 'success')
				setRefreshGroups(!refreshGroups)
				let object = {}
				object.navigate = () => {
					setNeedToNavigate(false)
					navigation.navigate(values.name)
				}
				setNavigate(object)
				setNeedToNavigate(true)
				setCreateGroup(false)
			},
			onError: (error) => {
				setWasPressed(false)
				showStatusMessage(error.data, 'failure')
			},
		})
	}

	return (
		<View>
			<View style={styles.rowLayout}>
				<BackButton action={setCreateGroup} />
				<Text style={[styles.mediumHeader, styles.marginLeftBottom]}>
					{t('create_group')}
				</Text>
			</View>
			<Formik
				initialValues={{
					name: '',
					description: '',
					password: '',
				}}
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
							required={true}
							largeField={false}
							placeholder={t('group_name')}
							handleChange={() => handleChange('name')}
							handleBlur={handleBlur('name')}
							errors={errors.name}
							touched={touched.name}
							value={values.name}
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
						<FormField
							hideText={true}
							required={false}
							largeField={false}
							placeholder={t('password')}
							handleChange={() => handleChange('password')}
							handleBlur={handleBlur('password')}
							errors={errors.password}
							touched={touched.password}
							value={values.password}
						/>

						<Button
							buttonStyle={styles.button}
							title={t('create_group')}
							onPress={handleSubmit}
							disabled={checkForFalse(!isValid, wasPressed)}
						/>
					</View>
				)}
			</Formik>
		</View>
	)
}
