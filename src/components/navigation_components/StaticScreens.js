import { useTranslation } from 'react-i18next'
import Settings from '../features/settings/Settings'
import GroupHub from '../features/group_hub/GroupHub'
import styles from '../../utils/styles'

export function StaticScreens(
	groups,
	setRefreshGroups,
	refreshGroups,
	setNavigate,
	setNeedToNavigate
) {
	const { t } = useTranslation()
	return (
		<React.Fragment key="fragment">
			<Drawer.Screen
				name={'Group Hub'}
				//tab translation not working currently
				options={{
					tabBarLabel: t('group_hub'),
					drawerIcon: () => (
						<Image
							source={require('../../assets/recruitment.png')}
							style={[styles.icon]}
						/>
					),
				}}
				children={() => (
					<GroupHub
						groups={groups}
						refreshGroups={refreshGroups}
						setRefreshGroups={setRefreshGroups}
						setNeedToNavigate={setNeedToNavigate}
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
							source={require('../../assets/recruitment.png')}
							style={[styles.icon]}
						/>
					),
				}}
				children={() => <Settings setLogin={setLogin} />}
			/>
		</React.Fragment>
	)
}
