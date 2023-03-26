import { TouchableOpacity, ImageBackground } from 'react-native'
import localStyles from './backButton.style'

export default function BackButton({ action }) {
	const backArrow = require('../../../assets/left-arrow.png')

	return (
		<TouchableOpacity onPress={() => action(false)}>
			<ImageBackground
				source={backArrow}
				resizeMode="cover"
				style={localStyles.backButton}
			/>
		</TouchableOpacity>
	)
}
