import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'

const Drawer = createDrawerNavigator()

export function NavigationWrapper({ screens }) {
	return (
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
				{screens}
			</Drawer.Navigator>
		</NavigationContainer>
	)
}
