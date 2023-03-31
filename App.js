import React, { useState, useEffect } from 'react'
import { View, Image } from 'react-native'
import FlashMessage from 'react-native-flash-message'
import Register from './src/components/features/start-screen/Register'
import Login from './src/components/features/start-screen/Login'
import ChangeLanguage from './src/components/general-components/ChangeLanguage'
import GroupHub from './src/components/features/group-hub/GroupHub'
import GroupPage from './src/components/features/group-page/GroupPage'
import Settings from './src/components/features/settings/Settings'
import styles from './src/utils/styles'
import { createDrawerNavigator } from '@react-navigation/drawer'
import AppStorage from './src/utils/secure-store'
import './src/utils/i18n'
import { useTranslation } from 'react-i18next'
import { getUserId } from './src/functions/general-functions'
import { NavigationWrapper } from './src/components/navigation-components/NavigationWrapper'
import { getUsersGroups } from './src/functions/http-functions/get-calls'

const Drawer = createDrawerNavigator()

export default function App() {
	const { t } = useTranslation()
	const [loginPage, setLoginPage] = useState(true)
	const [login, setLogin] = useState(false)
	const [loggedInScreen, setLoggedInScreen] = useState([])

	const [refreshGroups, setRefreshGroups] = useState(false)
	const [navigate, setNavigate] = useState(null)
	const [needToNavigate, setNeedToNavigate] = useState(false)

	useEffect(() => {
		if (needToNavigate) {
			navigate.navigate()
			setNeedToNavigate(false)
		}
	}, [loggedInScreen])

	useEffect(() => {
		;(async () => {
			const userInfo = await AppStorage.getValueFor('loginInfo')
			if (userInfo) {
				setLogin(true)
			}
		})()
	}, [])

	useEffect(() => {
		if (login) {
			;(async () => {
				const userId = await getUserId()
				const groups = (await getUsersGroups(userId)).data
				setLoggedInScreen(
					<NavigationWrapper
						screens={groups
							.map(createGroupScreen)
							.concat(staticScreens(groups))}
					/>
				)
			})()
		}
	}, [login, refreshGroups])

	function createGroupScreen(group) {
		return (
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

	function staticScreens(groups) {
		return (
			<React.Fragment key="fragment">
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
			</React.Fragment>
		)
	}

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
