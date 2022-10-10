import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import FlashMessage from 'react-native-flash-message'
import Register from './src/features/register/Register'
import Login from './src/features/login/Login'
import ChangeLanguage from './src/features/language_select/ChangeLanguage'
import GroupHub from './src/features/group_hub/GroupHub'
import GroupPage from './src/features/group_page/GroupPage'
import Settings from './src/features/settings/Settings'
import styles from './src/utils/styles'
import { getData } from './src/utils/http-requests'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import AppStorage from './src/utils/secure-store'
import jwt_decode from 'jwt-decode'
import './src/features/language_select/i18n'
import { useTranslation } from 'react-i18next'

const Drawer = createDrawerNavigator()

export default function App() {
	const { t } = useTranslation()
	const [loginPage, setLoginPage] = useState(true)
	const [login, setLogin] = useState(false)
	const [groups, setGroups] = useState([])
	const [groupScreens, setGroupScreens] = useState([])
	const [needToNavigate, setNeedToNavigate] = useState(false)
	const [readyToNavigate, setReadyToNavigate] = useState(false)
	const [refreshGroups, setRefreshGroups] = useState(false)
	useEffect(() => {
		const getLoginInfo = async () => {
			let userInfo = await AppStorage.getValueFor('loginInfo')
			if (userInfo) {
				setLogin(true)
			}
		}

		getLoginInfo()
	}, [])

	useEffect(() => {
		if (login) {
			getGroups()
		}
	}, [login, refreshGroups])

	useEffect(() => {
		createGroupScreens()
	}, [groups])

	useEffect(() => {
		if (needToNavigate) {
			setReadyToNavigate(true)
		}
	}, [groupScreens])

	const getGroups = async () => {
		let userInfo = await AppStorage.getValueFor('loginInfo')
		let decoded = jwt_decode(userInfo)
		await getData(`/groups/grouplist/${decoded.id}`, {
			onSuccess: async (response) => {
				//console.log(response.data)
				setGroups(response.data)
			},
			onError: (error) => {
				console.log(error)
			},
		})
	}

	const createGroupScreens = () => {
		let screens = []
		for (let group of groups) {
			screens.push(
				<Drawer.Screen
					key={group.id}
					name={group.name}
					children={() => (
						<GroupPage
							{...group}
							setRefreshGroups={setRefreshGroups}
							refreshGroups={refreshGroups}
						/>
					)}
				/>
			)
		}
		setGroupScreens(screens)
	}

	let loggedInScreen = (
		<NavigationContainer>
			<Drawer.Navigator>
				{groupScreens}
				<Drawer.Screen
					name={t('group_hub')}
					children={() => (
						<GroupHub
							refreshGroups={refreshGroups}
							setRefreshGroups={setRefreshGroups}
							setNeedToNavigate={setNeedToNavigate}
							readyToNavigate={readyToNavigate}
							setReadyToNavigate={setReadyToNavigate}
							groups={groups}
						/>
					)}
				/>
				<Drawer.Screen
					name={t('settings')}
					children={() => <Settings setLogin={setLogin} />}
				/>
			</Drawer.Navigator>
		</NavigationContainer>
	)

	const loginScreen = loginPage ? (
		<View>
			<Login setLoginPage={setLoginPage} setLogin={setLogin} />
			<ChangeLanguage />
		</View>
	) : (
		<Register setLoginPage={setLoginPage} />
	)

	return (
		<View style={styles.appContainer}>
			{login ? loggedInScreen : loginScreen}
			<FlashMessage position="top" />
		</View>
	)
}
