import { Text, View, ScrollView, TouchableOpacity } from 'react-native'
import styles from '../../../utils/styles'
import localStyles from './topic.style'
import React, { useState, useEffect } from 'react'
import AddNoteForm from '../topic_page/AddNoteForm'
import EditNoteForm from '../topic_page/EditNoteForm'
import EditTopicForm from '../topic_page/EditTopicForm'
import { getData } from '../../../functions/http_functions/http-requests'
import BackButton from '../../general_components/BackButton'
import NoteCard from './NoteCard'

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
		notes.forEach((element, index) => {
			if (notesStatus[index] != true && notesStatus[index] != false) {
				addToUseStateSlot(false, index)
			}
			const noteBlock = createNoteBlock(
				refreshNotes,
				setRefreshNotes,
				notesStatus,
				setNotesStatus,
				addToUseStateSlot
			)
			setNoteBlocks(notes.map(noteBlock))
		})
	}, [notes, refreshBlocks])

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

	const closeNoteForms = () => {
		for (let i = 0; i < notesStatus.length; i++) {
			notesStatus[i] = false
		}
	}

	const addToUseStateSlot = (item, slot) => {
		closeNoteForms()
		const tempArray = notesStatus
		tempArray[slot] = item
		setNotesStatus(tempArray)
		if (item === true) {
			setRefreshBlocks(!refreshBlocks)
		}
	}

	const createNoteBlock =
		(
			refreshNotes,
			setRefreshNotes,
			notesStatus,
			setNotesStatus,
			addToUseStateSlot
		) =>
		(note, index) => {
			return (
				<View key={note.id}>
					{notesStatus[index] ? (
						<EditNoteForm
							id={note.id}
							title={note.title}
							content={note.content}
							refreshNotes={refreshNotes}
							setRefreshNotes={setRefreshNotes}
							notesStatus={notesStatus}
							setNotesStatus={setNotesStatus}
							orderCount={index}
						/>
					) : (
						<NoteCard
							{...note}
							count={index}
							addToUseStateSlot={addToUseStateSlot}
							setRefreshNotes={setRefreshNotes}
							refreshNotes={refreshNotes}
						/>
					)}
				</View>
			)
		}

	return (
		<ScrollView>
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
				<View style={styles.rowLayout}>
					<BackButton action={setTopicsNotesVisible} />
					<TouchableOpacity
						style={localStyles.highWidth}
						onPress={() => setEditTopic(true)}
					>
						<Text style={[styles.mediumHeader, styles.centerText]}>
							{topic}
						</Text>
						<Text style={[styles.text, styles.centerText]}>{description}</Text>
					</TouchableOpacity>
				</View>
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
