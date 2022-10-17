import { TouchableOpacity, ImageBackground, Text, View } from 'react-native'
import styles from '../../utils/styles'
import localStyles from './noteCard.style'
import { showStatusMessage } from '../../utils/general-functions'
import { deleteData } from '../../utils/http-requests'

export default function SearchResultCard({
	title,
	content,
	id,
	count,
	addToUseStateSlot,
	setRefreshNotes,
	refreshNotes,
}) {
	const deleteNote = async (id) => {
		await deleteData(`/notes/note/${id}`, {
			onSuccess: async (response) => {
				showStatusMessage(response.data, 'success')
				setRefreshNotes(!refreshNotes)
			},
			onError: (error) => {
				showStatusMessage(error.data, 'failure')
			},
		})
	}

	return (
		<View style={styles.noteCard}>
			{title ? <Text style={styles.topicTitle}>{title}</Text> : null}
			<Text style={styles.topicDescription}>{content}</Text>
			<View style={localStyles.buttonContainer}>
				<TouchableOpacity title="delete" onPress={() => deleteNote(id)}>
					<ImageBackground
						style={localStyles.deleteButton}
						source={require('../../../assets/delete.png')}
						resizeMode="center"
					></ImageBackground>
				</TouchableOpacity>

				<TouchableOpacity
					title="edit"
					onPress={() => {
						addToUseStateSlot(true, count)
					}}
				>
					<ImageBackground
						style={localStyles.editButton}
						source={require('../../../assets/edit.png')}
						resizeMode="center"
					></ImageBackground>
				</TouchableOpacity>
			</View>
		</View>
	)
}
