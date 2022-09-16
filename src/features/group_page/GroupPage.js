import React, { useState, useEffect } from 'react'
import { ScrollView, TouchableOpacity, Text } from 'react-native'
import '../language_select/i18n'
import { useTranslation } from 'react-i18next'
import styles from '../../utils/styles'
import NewTopicForm from './NewTopicForm'
import Topic from './Topic'
import { getData } from '../../utils/http-requests'

export default function GroupHub({name, id }) {
  const { t } = useTranslation()

  const [newTopicFormVisible, setNewTopicFormVisible] = useState(false)
  const [topicsNotesVisible, setTopicsNotesVisible] = useState([])
  const [topicButtons, setTopicButtons] = useState([])
  const [topics, setTopics] = useState([])
  const [activeTopic, setActiveTopic] = useState([])

useEffect(() => {
  getTopics()
} , [])


useEffect(() => {
  createTopicButtons()
} , [topics])

const getTopics = async () => {
  await getData(`/topics/topiclist/${id}`, {
      onSuccess: async (response) => {
        setTopics(response.data)
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

const createTopicButtons = () => {
  let buttons = []
  for (var topic of topics) {
      buttons.push(<TouchableOpacity style={styles.topicButton} onPress={() => 
      {
        setActiveTopic(topic)
        setTopicsNotesVisible(true)
      }
      }>
      <Text style={styles.topicTitle}>{topic.topic}</Text>
      <Text style={styles.topicDescription}>{topic.description}</Text></TouchableOpacity>)
  }
  setTopicButtons(buttons)
}

  return (
    <ScrollView contentContainerStyle={styles.registerContainer}>
      {topicsNotesVisible && <Topic {...activeTopic}/>}
      <Text style={styles.headerStyle}>{name}</Text>
      {topicButtons}
      <TouchableOpacity style={styles.topicButton} onPress={() => setNewTopicFormVisible(true)}>
          <Text style={styles.newTopicTitle}>{t('new_topic')}</Text>
      </TouchableOpacity>
      <NewTopicForm newTopicFormVisible={newTopicFormVisible} setNewTopicFormVisible={setNewTopicFormVisible} groupId={id}/>
    </ScrollView>
  )
}
