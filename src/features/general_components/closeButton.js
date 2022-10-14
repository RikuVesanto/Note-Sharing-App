import { TouchableOpacity, ImageBackground } from 'react-native'
import styles from '../../utils/styles'

export default function CloseButton({ action }) {
	return (
		<TouchableOpacity title="close" onPress={() => action()}>
			<ImageBackground
				style={styles.closeButtonImage}
				source={require('../../../assets/close.png')}
				resizeMode="center"
			></ImageBackground>
		</TouchableOpacity>
	)
}
