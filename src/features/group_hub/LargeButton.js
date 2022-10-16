import { Button } from '@rneui/themed'
import styles from '../../utils/styles'

export default function LargeButton({ title, action }) {
	return (
		<Button
			buttonStyle={styles.largeButton}
			titleStyle={styles.largeButtonText}
			title={title}
			onPress={() => action(true)}
		/>
	)
}
