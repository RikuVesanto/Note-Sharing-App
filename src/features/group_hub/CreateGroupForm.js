import React, { useState, useEffect } from 'react'
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
import AppStorage from '../../utils/secure-store'
import jwt_decode from 'jwt-decode'
import { checkForFalse } from '../../utils/general-functions'

export default function CreateGroupForm({
	setCreateGroup,
	setNeedToNavigate,
	readyToNavigate,
	setReadyToNavigate,
	refreshGroups,
	setRefreshGroups,
}) {
	const navigation = useNavigation()
	const { t } = useTranslation()
	const [wasPressed, setWasPressed] = useState(false)
	const [navigationLocation, setNavigationLocation] = useState('')

	useEffect(() => {
		if (readyToNavigate) {
			setReadyToNavigate(false)
			setNeedToNavigate(false)
			navigation.navigate(navigationLocation)
			setCreateGroup(false)
		}
	}, [readyToNavigate])

	const sendData = async (values) => {
		let userInfo = await AppStorage.getValueFor('loginInfo')
		let decoded = jwt_decode(userInfo)
		var data = {
			name: values.name,
			creatorId: decoded.id,
		}
		if (values.password != '') data.password = values.password
		if (values.description != '') data.description = values.description
		await postData(data, '/groups/group', {
			onSuccess: async (response) => {
				//console.log(response.data)
				showStatusMessage(response.data, 'success')
				setRefreshGroups(!refreshGroups)
				setNeedToNavigate(true)
				setNavigationLocation(data.name)
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
				<Text style={styles.headerStyle}>{t('create_group')}</Text>
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
						<View style={styles.buttonStyle}>
							<Button
								title={t('create_group')}
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
