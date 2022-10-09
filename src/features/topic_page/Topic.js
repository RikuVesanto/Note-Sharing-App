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
import { getData, deleteData } from '../../utils/http-requests'
import BackButton from '../general_components/BackButton'
import { showStatusMessage, addToUseState } from '../../utils/general-functions'

export default function Topic({
	topic,
	description,
	id,
	setTopicsNotesVisible,
}) {
	const [notes, setNotes] = useState([])
	const [noteBlocks, setNoteBlocks] = useState([])
	const [refreshNotes, setRefreshNotes] = useState(false)
	const [notesStatus, setNotesStatus] = useState([])
	const [refreshBlocks, setRefreshBlocks] = useState(false)

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
				//console.log(response.data)
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

	const addToUseStateSlot = (item, slot) => {
		var tempArray = notesStatus
		//if another form is open close it
		tempArray.forEach(function (item, index) {
			notesStatus[index] = false
		})
		tempArray[slot] = item
		console.log(tempArray)
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
			<View style={styles.columnLayout}>
				<View style={styles.titleCardLayout}>
					<Text style={styles.headerStyle}>{topic}</Text>
					<Text style={styles.topicDescription}>{description}</Text>
				</View>
			</View>
			<AddNoteForm
				id={id}
				refreshNotes={refreshNotes}
				setRefreshNotes={setRefreshNotes}
			/>
			{noteBlocks}
		</ScrollView>
	)
}
