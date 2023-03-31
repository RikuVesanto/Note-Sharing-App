import { Text, View, ScrollView, TouchableOpacity } from 'react-native'
import styles from '../../../utils/styles'
import localStyles from './topic.style'
import React, { useState, useEffect } from 'react'
import AddNoteForm from './AddNoteForm'
import EditNoteForm from './EditNoteForm'
import EditTopicForm from './EditTopicForm'
import BackButton from '../../general_components/BackButton'
import NoteCard from './NoteCard'
import { getTopicsNotes } from '../../../functions/http_functions/get-calls'
import {
	editTopicInfo,
	editNote,
} from '../../../functions/http_functions/put-calls'
import { addNote } from '../../../functions/http_functions/post-calls'
import { deleteNote } from '../../../functions/http_functions/delete-calls'
import {
	delaySecondExecution,
	showStatusMessage,
} from '../../../functions/general-functions'

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

	const submitEditTopicFormWithBreak = delaySecondExecution(submitEditTopicForm)
	const submitEditNoteFormWithBreak = delaySecondExecution(submitEditNoteForm)
	const submitNoteDeletionWithBreak = delaySecondExecution(submitNoteDeletion)

	useEffect(() => {
		;(async () => {
			const response = await getTopicsNotes(id)
			if (response.status === 200) {
				setNotes(response.data)
			}
		})()
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
							noteId={note.id}
							title={note.title}
							content={note.content}
							refreshNotes={refreshNotes}
							setRefreshNotes={setRefreshNotes}
							notesStatus={notesStatus}
							setNotesStatus={setNotesStatus}
							orderCount={index}
							action={submitEditNoteFormWithBreak}
						/>
					) : (
						<NoteCard
							{...note}
							count={index}
							addToUseStateSlot={addToUseStateSlot}
							setRefreshNotes={setRefreshNotes}
							refreshNotes={refreshNotes}
							action={submitNoteDeletionWithBreak}
						/>
					)}
				</View>
			)
		}

	async function submitEditTopicForm(values) {
		const response = await editTopicInfo(values, id)
		if (response.status === 201) {
			showStatusMessage(response.data, 'success')
			setRefreshTopics(!refreshTopics)
			setEditTopic(false)
			setActiveTopic(values)
		} else {
			showStatusMessage(response.data, 'failure')
		}
	}

	async function submitNoteForm(values) {
		const response = await addNote(values, id)
		if (response.status === 201) {
			showStatusMessage(response.data, 'success')
			setRefreshNotes(!refreshNotes)
			closeNoteForms()
		} else {
			showStatusMessage(response.data.message, 'failure')
		}
	}

	async function submitEditNoteForm(values, noteId, orderCount) {
		const response = await editNote(values, noteId)
		if (response.status === 201) {
			showStatusMessage(response.data, 'success')
			setRefreshNotes(!refreshNotes)
			const tempArray = notesStatus
			tempArray[orderCount] = false
			setNotesStatus(tempArray)
		} else {
			showStatusMessage(error.data, 'failure')
		}
	}

	async function submitNoteDeletion(id) {
		const response = await deleteNote(id)
		if (response.status === 200) {
			showStatusMessage(response.data, 'success')
			setRefreshNotes(!refreshNotes)
		}
	}

	return (
		<ScrollView>
			{editTopic ? (
				<EditTopicForm
					setEditTopic={setEditTopic}
					topic={topic}
					description={description}
					action={submitEditTopicFormWithBreak}
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

			<AddNoteForm action={submitNoteForm} />
			{noteBlocks}
		</ScrollView>
	)
}
