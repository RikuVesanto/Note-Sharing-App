import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import styles from '../../utils/styles'
import { Button } from '@rneui/themed'
import { Formik } from 'formik'
import { SearchValidationSchema } from '../../utils/validation-schemas'
import { useTranslation } from 'react-i18next'
import '../language_select/i18n'
import { getData, postData } from '../../utils/http-requests'
import { showStatusMessage } from '../../utils/general-functions'
import SearchResultCard from './SearchResultCard'
import FormField from '../general_components/FormField'
import BackButton from '../general_components/BackButton'
import { useNavigation } from '@react-navigation/native'
import AppStorage from '../../utils/secure-store'
import jwt_decode from 'jwt-decode'

export default function GroupSearch({
	setJoinGroup,
	setNeedToNavigate,
	readyToNavigate,
	setReadyToNavigate,
	refreshGroups,
	setRefreshGroups,
	usersGroups,
}) {
	const navigation = useNavigation()
	const { t } = useTranslation()
	const [groups, setGroups] = useState('')
	const [searchResultCards, setSearchResultCards] = useState([])
	const [navigationLocation, setNavigationLocation] = useState('')

	useEffect(() => {
		createSearchResultCards()
	}, [groups])

	useEffect(() => {
		if (readyToNavigate) {
			setReadyToNavigate(false)
			setNeedToNavigate(false)
			navigation.navigate(navigationLocation)
			setJoinGroup(false)
		}
	}, [readyToNavigate])

	const createSearchResultCards = () => {
		let screens = []
		let results = 0
		for (var group of groups) {
			screens.push(
				<SearchResultCard
					key={group.id}
					name={group.name}
					description={group.description}
					action={joinGroup}
					groupId={group.id}
					usersGroups={usersGroups}
				/>
			)
			results++
		}
		screens.unshift(
			<Text key="results" style={styles.resultsText}>
				{results + ' ' + t('results_found')}
			</Text>
		)
		setSearchResultCards(screens)
	}

	const joinGroup = async (groupId, location) => {
		let userInfo = await AppStorage.getValueFor('loginInfo')
		let decoded = jwt_decode(userInfo)
		const values = {
			userId: decoded.id,
			groupId: groupId,
		}
		await postData(values, '/groups/userconnection/', {
			onSuccess: async (response) => {
				showStatusMessage(response.data, 'success')
				setRefreshGroups(!refreshGroups)
				setNeedToNavigate(true)
				setNavigationLocation(location)
			},
			onError: (error) => {
				showStatusMessage(error.data, 'failure')
			},
		})
	}

	const getGroups = async (values) => {
		await getData(`/groups/searchlist/${values.search}`, {
			onSuccess: async (response) => {
				setGroups(response.data)
			},
			onError: (error) => {
				console.log(error)
			},
		})
	}

	return (
		<View>
			<View style={styles.rowLayout}>
				<BackButton action={setJoinGroup} />
				<Text style={styles.headerStyle}>{t('group_search')}</Text>
			</View>
			<Formik
				initialValues={{
					search: '',
				}}
				validationSchema={SearchValidationSchema}
				validateOnMount={true}
				onSubmit={(values) => {
					getGroups(values)
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
							placeholder={t('group_name')}
							handleChange={() => handleChange('search')}
							handleBlur={handleBlur('search')}
							errors={errors.search}
							touched={touched.search}
							value={values.search}
						/>
						<View style={styles.buttonStyle}>
							<Button
								title={t('search')}
								onPress={handleSubmit}
								disabled={!isValid}
							/>
						</View>
					</View>
				)}
			</Formik>
			{searchResultCards}
		</View>
	)
}
