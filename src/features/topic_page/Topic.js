import {Text, View, ImageBackground, TouchableOpacity} from 'react-native'
import styles from '../../utils/styles'
import React, { useState, useEffect } from 'react'
import AddNoteForm from '../topic_page/AddNoteForm'
import { getData } from '../../utils/http-requests'
import BackButton from '../general_components/BackButton'

export default function Topic({topic,description,id,setTopicsNotesVisible}) {
  const [addNote, setAddNote] = useState(false)
  const [notes, setNotes] = useState([])
  const [noteBlocks, setNoteBlocks] = useState([])

  var addIcon = require('../../../assets/add.png')
  var minusIcon = require('../../../assets/minus.png')

  useEffect(() => {
    getNotes()
  
  } , [])
  
  useEffect(() => {
    createNoteBlocks()
  } , [notes])

  const getNotes = async () => {
    await getData(`/notes/notelist/${id}`, {
        onSuccess: async (response) => {
          console.log(response.data)
          setNotes(response.data)
        },
        onError: (error) => {
          console.log(error)
          let message = ''
          if (error.response.status === 500) {
            message = i18n.t('register_form_error')
          } else {
            message = error.response.data
          }
        },
      })
  }
  
  const createNoteBlocks = () => {
    let blocks = []
    for (var note of notes) {
      blocks.push(<View key={note.id}><Text style={styles.topicTitle}>{note.title}</Text>
        <Text style={styles.topicDescription}>{note.content}</Text></View>)
    }
    setNoteBlocks(blocks)
  }

  return (
    <View>
      <View style={styles.rowLayout}>
        <BackButton action={setTopicsNotesVisible}/> 
        <View style={styles.columnLayout}>
          <Text style={styles.headerStyle}>{topic}</Text>
          <Text style={styles.topicDescription}>{description}</Text>
        </View>
      </View>
      {addNote ? <TouchableOpacity onPress={() => setAddNote(false)}>
        <ImageBackground
            source={minusIcon}
            resizeMode="cover"
            style={styles.addnoteButton}
        /></TouchableOpacity> : <TouchableOpacity onPress={() => setAddNote(true)}>
        <ImageBackground
            source={addIcon}
            resizeMode="cover"
            style={styles.addnoteButton}
        />
      </TouchableOpacity>}
      {addNote && <AddNoteForm id={id} notes={notes} setNotes={setNotes} setAddNote={setAddNote}/>}
      {noteBlocks}
    </View>
  )
}