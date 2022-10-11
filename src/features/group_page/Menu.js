import React, { useState, useEffect } from 'react'
import {
	View,
	TouchableOpacity,
	ImageBackground,
	FlatList,
	Text,
} from 'react-native'
import styles from '../../utils/styles'
import { deleteData } from '../../utils/http-requests'
import { showStatusMessage } from '../../utils/general-functions'
import AppStorage from '../../utils/secure-store'
import jwt_decode from 'jwt-decode'
import { useNavigation } from '@react-navigation/native'
import { getData } from '../../utils/http-requests'
import { useTranslation } from 'react-i18next'
import '../language_select/i18n'

export default function Menu({ id, setRefreshGroups }) {
	const { t } = useTranslation()
	const navigation = useNavigation()

	const [users, setUsers] = useState([])

	const leaveGroup = async () => {
		let userInfo = await AppStorage.getValueFor('loginInfo')
		let decoded = jwt_decode(userInfo)
		await deleteData(`/groups/userconnection/${id}/${decoded.id}`, {
			onSuccess: async (response) => {
				showStatusMessage(response.data, 'success', 600)
				setRefreshGroups(true)
				navigation.navigate('Group Hub')
			},
			onError: (error) => {
				showStatusMessage(error.data, 'failure')
			},
		})
	}

	useEffect(() => {
		async function getUsers() {
			await getData(`/groups/userlist/${id}`, {
				onSuccess: async (response) => {
					setUsers(
						response.data.map((user) => {
							return { key: user.username }
						})
					)
				},
				onError: (error) => {
					showStatusMessage(error.data, 'failure')
				},
			})
		}
		getUsers()
	}, [])

	useEffect(() => {
		console.log(users)
	}, [users])
	return (
		<View style={styles.menu}>
			<View style={styles.headerView}>
				<View style={styles.headerViewLeft}>
					<Text style={styles.userListTitle}>{t('user_list')}</Text>
				</View>
				<View style={styles.headerViewRight}>
					<TouchableOpacity
						onPress={() => {
							leaveGroup()
						}}
					>
						<ImageBackground
							style={styles.logoutButton}
							source={require('../../../assets/logout.png')}
							resizeMode="center"
						></ImageBackground>
					</TouchableOpacity>
				</View>
			</View>
			<FlatList
				data={users}
				renderItem={({ item }) => (
					<Text style={styles.userListItem}>{item.key}</Text>
				)}
			/>
		</View>
	)
}
