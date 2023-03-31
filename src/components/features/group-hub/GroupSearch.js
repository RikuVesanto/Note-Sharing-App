import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView } from 'react-native'
import styles from '../../../utils/styles'
import localStyles from './groupSearch.style'
import { useTranslation } from 'react-i18next'
import '../../../utils/i18n'
import {
	showStatusMessage,
	getUserId,
	delaySecondExecution,
} from '../../../functions/general-functions'
import SearchResultCard from './UI-components/SearchResultCard'
import GroupSearchForm from './UI-components/GroupSearchForm'
import BackButton from '../../general_components/BackButton'
import { useNavigation } from '@react-navigation/native'
import { getGroupsBySearchWord } from '../../../functions/http_functions/get-calls'
import { addUserToGroup } from '../../../functions/http_functions/post-calls'

export default function GroupSearch({
	setJoinGroup,
	setNeedToNavigate,
	refreshGroups,
	setRefreshGroups,
	usersGroups,
	setNavigate,
}) {
	const navigation = useNavigation()
	const { t } = useTranslation()
	const [groups, setGroups] = useState('')
	const [searchResultCards, setSearchResultCards] = useState([])

	const submitJoinRequestWithBreak = delaySecondExecution(submitJoinRequest)
	const submitSearchWithBreak = delaySecondExecution(submitSearch)

	useEffect(() => {
		if (groups) {
			const resultCount = groups.length
			const resultCards = groups.map((group) =>
				createSearchResultCard(group, submitJoinRequestWithBreak)
			)
			const resultCountAndCards = [
				<Text key="results" style={localStyles.resultsText}>
					{resultCount + ' ' + t('results_found')}
				</Text>,
				...resultCards,
			]
			setSearchResultCards(resultCountAndCards)
		}
	}, [groups])

	const createSearchResultCard = (group, action) => {
		return (
			<SearchResultCard
				key={group.id}
				name={group.name}
				description={group.description}
				action={action}
				groupId={group.id}
				usersGroups={usersGroups}
			/>
		)
	}

	const submitJoinRequest = async (groupId, location) => {
		const userId = await getUserId()
		const response = await addUserToGroup(groupId, userId)
		if (response.status === 201) {
			showStatusMessage(response.data, 'success')
			setRefreshGroups(!refreshGroups)
			const object = {}
			object.navigate = () => {
				setNeedToNavigate(false)
				navigation.navigate(location)
			}
			setNavigate(object)
			setNeedToNavigate(true)
			setJoinGroup(false)
		} else {
			showStatusMessage(error.data, 'failure')
		}
	}

	async function submitSearch(values) {
		const groups = (await getGroupsBySearchWord(values)).data
		setGroups(groups)
	}

	return (
		<ScrollView>
			<View style={styles.rowLayout}>
				<BackButton action={setJoinGroup} />
				<Text style={[styles.mediumHeader, styles.marginLeftBottom]}>
					{t('group_search')}
				</Text>
			</View>
			<GroupSearchForm action={submitSearchWithBreak} />
			{searchResultCards}
		</ScrollView>
	)
}
