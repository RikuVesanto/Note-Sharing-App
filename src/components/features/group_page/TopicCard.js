import { TouchableOpacity, Text } from 'react-native'
import styles from '../../../utils/styles'
import localStyles from './topicCard.style'

export default function TopicCard({ title, description, action }) {
	return (
		<TouchableOpacity
			key={title}
			style={localStyles.topicButton}
			onPress={() => action(true)}
		>
			<Text style={[styles.topicTitle, styles.marginTop]}>{title}</Text>
			<Text style={styles.topicDescription}>{description}</Text>
		</TouchableOpacity>
	)
}
