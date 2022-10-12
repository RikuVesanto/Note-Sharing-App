import {
	Text,
	View,
	ScrollView,
	TouchableOpacity,
	ImageBackground,
} from 'react-native'
import styles from '../../utils/styles'
import React, { useState, useEffect } from 'react'
import AddNoteForm from '../topic_page/AddNoteForm'
import EditNoteForm from '../topic_page/EditNoteForm'
import EditTopicForm from '../topic_page/EditTopicForm'
import { getData, deleteData } from '../../utils/http-requests'
import BackButton from '../general_components/BackButton'
import { showStatusMessage } from '../../utils/general-functions'

export default function Topic({
	topic,
	description,
	id,
	setTopicsNotesVisible,
	setRefreshTopics,
	refreshTopics,
	setActiveTopic,
}) {
	const [notes, setNotes] = useState([])
	const [noteBlocks, setNoteBlocks] = useState([])
	const [refreshNotes, setRefreshNotes] = useState(false)
	const [notesStatus, setNotesStatus] = useState([])
	const [refreshBlocks, setRefreshBlocks] = useState(false)
	const [editTopic, setEditTopic] = useState(false)

	useEffect(() => {
		getNotes()
	}, [refreshNotes])

	useEffect(() => {
		createNoteBlocks()
	}, [notes])

	useEffect(() => {
		createNoteBlocks()
	}, [refreshBlocks])

	const getNotes = async () => {
		await getData(`/notes/notelist/${id}`, {
			onSuccess: async (response) => {
				setNotes(response.data)
			},
			onError: (error) => {
				console.log(error)
			},
		})
	}

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

	const closeNoteForms = () => {
		for (let i = 0; i < notesStatus.length; i++) {
			notesStatus[i] = false
		}
	}
	const addToUseStateSlot = (item, slot) => {
		closeNoteForms()
		var tempArray = notesStatus
		tempArray[slot] = item
		setNotesStatus(tempArray)
		if (item == true) {
			setRefreshBlocks(!refreshBlocks)
		}
	}

	const createNoteBlocks = () => {
		let blocks = []
		let i = 0
		for (let note of notes) {
			//using i later defaults to the last value during the for loop since it's defined outside of it
			note.count = i
			if (
				notesStatus[note.count] != true &&
				notesStatus[note.count] != false
			) {
				addToUseStateSlot(false, note.count)
			}

			blocks.push(
				<View key={note.id}>
					{notesStatus[note.count] ? (
						<EditNoteForm
							id={note.id}
							title={note.title}
							content={note.content}
							refreshNotes={refreshNotes}
							setRefreshNotes={setRefreshNotes}
							notesStatus={notesStatus}
							setNotesStatus={setNotesStatus}
							orderCount={note.count}
						/>
					) : (
						<View style={styles.noteCard}>
							{note.title ? (
								<Text style={styles.topicTitle}>
									{note.title}
								</Text>
							) : null}
							<Text style={styles.topicDescription}>
								{note.content}
							</Text>
							<View style={styles.buttonContainer}>
								<TouchableOpacity
									title="delete"
									onPress={() => deleteNote(note.id)}
								>
									<ImageBackground
										style={styles.deleteButton}
										source={require('../../../assets/delete.png')}
										resizeMode="center"
									></ImageBackground>
								</TouchableOpacity>

								<TouchableOpacity
									title="edit"
									onPress={() => {
										addToUseStateSlot(true, note.count)
									}}
								>
									<ImageBackground
										style={styles.editButton}
										source={require('../../../assets/edit.png')}
										resizeMode="center"
									></ImageBackground>
								</TouchableOpacity>
							</View>
						</View>
					)}
				</View>
			)
			i++
		}
		setNoteBlocks(blocks)
	}

	return (
		<ScrollView>
			<BackButton action={setTopicsNotesVisible} />
			{editTopic ? (
				<EditTopicForm
					setEditTopic={setEditTopic}
					setRefreshTopics={setRefreshTopics}
					refreshTopics={refreshTopics}
					topicId={id}
					topic={topic}
					description={description}
					setActiveTopic={setActiveTopic}
				/>
			) : (
				<TouchableOpacity
					style={styles.columnLayout}
					onPress={() => setEditTopic(true)}
				>
					<View style={styles.titleCardLayout}>
						<Text style={styles.headerStyle}>{topic}</Text>
						<Text style={styles.topicDescription}>
							{description}
						</Text>
					</View>
				</TouchableOpacity>
			)}
			<AddNoteForm
				id={id}
				refreshNotes={refreshNotes}
				setRefreshNotes={setRefreshNotes}
				closeNoteForms={closeNoteForms}
			/>
			{noteBlocks}
		</ScrollView>
	)
}
