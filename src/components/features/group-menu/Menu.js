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
} from '../../../functions/general-functions'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import '../../../utils/i18n'
import { getGroupsUserList } from '../../../functions/http_functions/get-calls'
import { changeGroupAdmin } from '../../../functions/http_functions/put-calls'
import { removeUserFromGroup } from '../../../functions/http_functions/delete-calls'

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

	const [users, setUsers] = useState([])
	const [refreshUsers, setRefreshUsers] = useState(false)

	const leaveGroup = async (groupId) => {
		const userId = await getUserId()
		const response = await removeUserFromGroup(groupId, userId)
		if (response.status === 200) {
			showStatusMessage(response.data, 'success', 600)
			setRefreshGroups(!refreshGroups)
			navigation.navigate('Group Hub')
		} else {
			showStatusMessage(error.data, 'failure')
		}
	}

	const removeFromGroup = async (groupId, userId) => {
		const response = await removeUserFromGroup(groupId, userId)
		console.log(response)
		if (response.status === 200) {
			showStatusMessage('Removed user', 'success')
			setRefreshUsers(!refreshUsers)
		} else {
			showStatusMessage(error.data, 'failure')
		}
	}

	const giveAdmin = async (newAdminId) => {
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
						onPress={() => {
							if (!admin) {
								leaveGroup(id)
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
											removeFromGroup(id, item.id)
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
											giveAdmin(item.id)
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
