import { Text, ScrollView, View } from 'react-native'
import React, { useState } from 'react'
import CreateGroupForm from './UI-components/CreateGroupForm'
import GroupSearch from './GroupSearch'
import LargeButton from './UI-components/LargeButton'
import '../../../utils/i18n'
import { useTranslation } from 'react-i18next'
import styles from '../../../utils/styles'
import { useNavigation } from '@react-navigation/native'
import {
	getUserId,
	showStatusMessage,
	delaySecondExecution,
} from '../../../functions/general-functions'
import { addGroup } from '../../../functions/http_functions/post-calls'

export default function GroupHub({
	setNeedToNavigate,
	setNavigate,
	refreshGroups,
	setRefreshGroups,
	groups,
}) {
	const { t } = useTranslation()
	const [createGroup, setCreateGroup] = useState(false)
	const [joinGroup, setJoinGroup] = useState(false)
	const navigation = useNavigation()
	const submitGroupFormWithBreak = delaySecondExecution(submitGroupForm)

	async function submitGroupForm(values) {
		const userId = await getUserId()
		const response = await addGroup(values, userId)
		if (response.status === 201) {
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
		} else {
			showStatusMessage(response.data, 'failure')
		}
	}

	return (
		<ScrollView contentContainerStyle={styles.mainContainer}>
			{!joinGroup && !createGroup && (
				<Text style={styles.largeHeader}>{t('group_hub')}</Text>
			)}
			{!createGroup && !joinGroup && (
				<View>
					<LargeButton title={t('create_group')} action={setCreateGroup} />
					<LargeButton title={t('join_group')} action={setJoinGroup} />
				</View>
			)}
			{createGroup && (
				<CreateGroupForm
					setCreateGroup={setCreateGroup}
					action={submitGroupFormWithBreak}
				/>
			)}
			{joinGroup && (
				<GroupSearch
					setJoinGroup={setJoinGroup}
					refreshGroups={refreshGroups}
					setRefreshGroups={setRefreshGroups}
					setNeedToNavigate={setNeedToNavigate}
					usersGroups={groups}
					setNavigate={setNavigate}
				/>
			)}
		</ScrollView>
	)
}
