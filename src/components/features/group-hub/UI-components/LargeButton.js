import { Button } from '@rneui/themed'
import localStyles from './largeButton.style'

export default function LargeButton({ title, action }) {
	return (
		<Button
			buttonStyle={localStyles.largeButton}
			titleStyle={localStyles.largeButtonText}
			title={title}
			onPress={() => action(true)}
		/>
	)
}
