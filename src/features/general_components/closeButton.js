import { TouchableOpacity, ImageBackground } from 'react-native'
import localStyles from './closeButton.style'

export default function CloseButton({ action }) {
	return (
		<TouchableOpacity title="close" onPress={() => action()}>
			<ImageBackground
				style={localStyles.closeButtonImage}
				source={require('../../../assets/close.png')}
				resizeMode="center"
			></ImageBackground>
		</TouchableOpacity>
	)
}
