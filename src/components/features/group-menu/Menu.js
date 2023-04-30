import React, { useState, useEffect } from 'react'
import {
	View,
	TouchableOpacity,
	ImageBackground,
	FlatList,
	Text,
	Alert,
} from 'react-native'
import styles from '../../../utils/styles'
import localStyles from './menu.style'
import {
	showStatusMessage,
	getUserId,
	delaySecondExecution,
} from '../../../functions/general-functions'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import '../../../utils/i18n'
import { getGroupsUserList } from '../../../functions/http-functions/get-calls'
import { changeGroupAdmin } from '../../../functions/http-functions/put-calls'
import { removeUserFromGroup } from '../../../functions/http-functions/delete-calls'

export default function Menu({
	id,
	setRefreshGroups,
	refreshGroups,
	userId,
	admin,
	setAdmin,
}) {
	const { t } = useTranslation()
	const navigation = useNavigation()

	const leaveGroupWithBreak = delaySecondExecution(leaveGroup)
	const removeFromGroupWithBreak = delaySecondExecution(removeFromGroup)
	const giveAdminWithBreak = delaySecondExecution(giveAdmin)

	const [users, setUsers] = useState([])
	const [refreshUsers, setRefreshUsers] = useState(false)

	async function leaveGroup(
		groupId,
		userId,
		executeApiCall,
		setState,
		state,
		displayStatus,
		navigate
	) {
		const response = await executeApiCall(groupId, userId)
		if (response.status === 200) {
			displayStatus(response.data, 'success', 600)
			setState(!state)
			navigate('Group Hub')
		} else {
			displayStatus(error.data, 'failure')
		}
	}

	async function removeFromGroup(groupId, userId) {
		const response = await removeUserFromGroup(groupId, userId)
		console.log(response)
		if (response.status === 200) {
			showStatusMessage('Removed user', 'success')
			setRefreshUsers(!refreshUsers)
		} else {
			showStatusMessage(error.data, 'failure')
		}
	}

	async function giveAdmin(newAdminId) {
		Alert.alert(t('removeAdminTitle'), t('removeAdminDescription'), [
			{
				text: 'Yes',
				onPress: async () => {
					const response = await changeGroupAdmin(id, newAdminId)
					if (response.status === 200) {
						showStatusMessage(response.data, 'success')
						setAdmin(false)
					} else {
						showStatusMessage(error.data, 'failure')
					}
				},
			},
			{
				text: 'No',
			},
		])
	}

	useEffect(() => {
		;(async () => {
			const response = await getGroupsUserList(id)
			if (response.status === 200) {
				const users = response.data
				setUsers(
					users.map((user) => {
						return { username: user.username, id: user.id }
					})
				)
			}
		})()
	}, [refreshUsers])

	return (
		<View style={localStyles.menu}>
			<View style={localStyles.headerView}>
				<View style={localStyles.headerViewLeft}>
					<Text style={localStyles.userListTitle}>{t('user_list')}</Text>
				</View>
				<View style={localStyles.headerViewRight}>
					<TouchableOpacity
						onPress={async () => {
							if (!admin) {
								const userId = await getUserId()
								leaveGroupWithBreak(
									id,
									userId,
									removeUserFromGroup,
									setRefreshGroups,
									refreshGroups,
									showStatusMessage,
									navigation.navigate
								)
							} else {
								showStatusMessage(
									'Remove your admin rights before leaving',
									'failure'
								)
							}
						}}
					>
						<ImageBackground
							style={[
								styles.logoutButton,
								styles.marginTop,
								styles.largeMarginRight,
							]}
							source={require('../../../../assets/logout.png')}
							resizeMode="center"
						></ImageBackground>
					</TouchableOpacity>
				</View>
			</View>
			<View>
				<FlatList
					data={users}
					renderItem={({ item }) => (
						<View style={[styles.rowLayout, localStyles.userListItem]}>
							<View>
								<Text style={localStyles.itemText}>{item.username}</Text>
							</View>
							{admin && userId != item.id && (
								<View style={styles.rowLayout}>
									<TouchableOpacity
										onPress={() => {
											removeFromGroupWithBreak(id, item.id)
										}}
									>
										<ImageBackground
											style={[localStyles.button]}
											source={require('../../../../assets/delete.png')}
											resizeMode="center"
										></ImageBackground>
									</TouchableOpacity>
									<TouchableOpacity
										onPress={() => {
											giveAdminWithBreak(item.id)
										}}
									>
										<ImageBackground
											style={[localStyles.button]}
											source={require('../../../../assets/add.png')}
											resizeMode="center"
										></ImageBackground>
									</TouchableOpacity>
								</View>
							)}
						</View>
					)}
				/>
			</View>
		</View>
	)
}
