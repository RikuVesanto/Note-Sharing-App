import GroupPage from '../../features/group_page/GroupPage'
import { Image } from 'react-native'
import styles from '../../../utils/styles'

export function GroupScreen(
	group,
	setRefreshGroups,
	refreshGroups,
	setNavigate,
	setNeedToNavigate
) {
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
						source={require('../../assets/group.png')}
						style={[styles.icon]}
					/>
				),
			}}
		/>
	)
}
