import { TouchableOpacity, Text, View } from 'react-native'
import styles from '../../utils/styles'

export default function LargeButton({ title, action }) {
	return (
		<View>
			<TouchableOpacity
				style={styles.largeButton}
				title={title}
				onPress={() => action(true)}
			>
				<Text style={styles.largeButtonTitle}>{title}</Text>
			</TouchableOpacity>
		</View>
	)
}
