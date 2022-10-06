import { Text, View, ScrollView } from 'react-native'
import styles from '../../utils/styles'
import React, { useState, useEffect } from 'react'
import AddNoteForm from '../topic_page/AddNoteForm'
import { getData } from '../../utils/http-requests'
import BackButton from '../general_components/BackButton'

export default function Topic({
	topic,
	description,
	id,
	setTopicsNotesVisible,
}) {
	const [notes, setNotes] = useState([])
	const [noteBlocks, setNoteBlocks] = useState([])
	const [refreshNotes, setRefreshNotes] = useState([])

	useEffect(() => {
		getNotes()
	}, [refreshNotes])

	useEffect(() => {
		createNoteBlocks()
	}, [notes])

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

	const createNoteBlocks = () => {
		let blocks = []
		for (var note of notes) {
			console.log(note.id)
			blocks.push(
				<View key={note.id} style={styles.noteCard}>
					{note.title && (
						<Text style={styles.topicTitle}>{note.title}</Text>
					)}
					<Text style={styles.topicDescription}>{note.content}</Text>
				</View>
			)
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
