import { Text, View, ScrollView, TouchableOpacity } from 'react-native'
import styles from '../../../utils/styles'
import localStyles from './topic.style'
import React, { useState, useEffect } from 'react'
import AddNoteForm from './UI-components/AddNoteForm'
import EditNoteForm from './UI-components/EditNoteForm'
import EditTopicForm from './UI-components/EditTopicForm'
import BackButton from '../../general-components/BackButton'
import NoteCard from './UI-components/NoteCard'
import { getTopicsNotes } from '../../../functions/http-functions/get-calls'
import {
	editTopicInfo,
	editNote,
} from '../../../functions/http-functions/put-calls'
import { addNote } from '../../../functions/http-functions/post-calls'
import { deleteNote } from '../../../functions/http-functions/delete-calls'
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
		const noteBlock = createNoteBlock(
			refreshNotes,
			setRefreshNotes,
			notesStatus,
			setNotesStatus,
			addToUseStateSlot
		)
		setNoteBlocks(notes.map(noteBlock))
	}, [notes, refreshBlocks])

	const addToUseStateSlot = (item, slot) => {
		const tempArray = notesStatus.map((element, index) =>
			index === slot ? item : false
		)
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
