import { Text, ScrollView, View } from 'react-native'
import React, { useState } from 'react'
import CreateGroupForm from './CreateGroupForm'
import GroupSearch from './GroupSearch'
import LargeButton from './LargeButton'
import '../language_select/i18n'
import { useTranslation } from 'react-i18next'
import styles from '../../../utils/styles'

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
					refreshGroups={refreshGroups}
					setRefreshGroups={setRefreshGroups}
					setCreateGroup={setCreateGroup}
					setNeedToNavigate={setNeedToNavigate}
					setNavigate={setNavigate}
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
