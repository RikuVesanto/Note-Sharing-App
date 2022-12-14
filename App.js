import React, { useState, useEffect } from 'react'
import { View, Image } from 'react-native'
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
import './src/features/language_select/i18n'
import { useTranslation } from 'react-i18next'
import { getUserId } from './src/utils/general-functions'

const Drawer = createDrawerNavigator()

export default function App() {
	const { t } = useTranslation()
	const [loginPage, setLoginPage] = useState(true)
	const [login, setLogin] = useState(false)
	const [groups, setGroups] = useState([])
	const [groupScreens, setGroupScreens] = useState([])

	const [refreshGroups, setRefreshGroups] = useState(false)
	const [navigate, setNavigate] = useState(null)
	const [needToNavigate, setNeedToNavigate] = useState(false)
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
			navigate.navigate()
			setNeedToNavigate(false)
		}
	}, [groupScreens])

	const getGroups = async () => {
		let userId = await getUserId()
		await getData(`/groups/grouplist/${userId}`, {
			onSuccess: async (response) => {
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
							setNeedToNavigate={setNeedToNavigate}
							setNavigate={setNavigate}
						/>
					)}
					options={{
						drawerIcon: () => (
							<Image
								source={require('./assets/group.png')}
								style={[styles.icon]}
							/>
						),
					}}
				/>
			)
		}
		setGroupScreens(screens)
	}

	let loggedInScreen = (
		<NavigationContainer>
			<Drawer.Navigator
				screenOptions={{
					drawerActiveTintColor: '#ffffff',
					drawerInactiveTintColor: '#ffffff',
					drawerStyle: {
						backgroundColor: '#8cbbf1',
						width: '65%',
					},
				}}
			>
				{groupScreens}
				<Drawer.Screen
					name={'Group Hub'}
					//tab translation not working currently
					options={{
						tabBarLabel: t('group_hub'),
						drawerIcon: () => (
							<Image
								source={require('./assets/recruitment.png')}
								style={[styles.icon]}
							/>
						),
					}}
					children={() => (
						<GroupHub
							refreshGroups={refreshGroups}
							setRefreshGroups={setRefreshGroups}
							setNeedToNavigate={setNeedToNavigate}
							groups={groups}
							setNavigate={setNavigate}
						/>
					)}
				/>
				<Drawer.Screen
					name={'Settings'}
					//tab translation not working currently
					options={{
						tabBarLabel: t('settings'),
						drawerIcon: () => (
							<Image
								source={require('./assets/setting.png')}
								style={[styles.icon]}
							/>
						),
					}}
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
