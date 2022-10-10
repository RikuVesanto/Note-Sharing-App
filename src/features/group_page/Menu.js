import { View, TouchableOpacity, ImageBackground } from 'react-native'
import styles from '../../utils/styles'
import { deleteData } from '../../utils/http-requests'
import { showStatusMessage } from '../../utils/general-functions'
import AppStorage from '../../utils/secure-store'
import jwt_decode from 'jwt-decode'
import { useNavigation } from '@react-navigation/native'

export default function Menu({ id, setRefreshGroups }) {
	const navigation = useNavigation()
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

	return (
		<View style={styles.menu}>
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
	)
}
