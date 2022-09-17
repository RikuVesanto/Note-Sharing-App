import React, { useState, useEffect } from 'react'
import { ScrollView, TouchableOpacity, Text, View } from 'react-native'
import '../language_select/i18n'
import { useTranslation } from 'react-i18next'
import styles from '../../utils/styles'
import NewTopicForm from './NewTopicForm'
import Topic from '../topic_page/Topic'
import TopicCard from './TopicCard'
import { getData } from '../../utils/http-requests'

export default function GroupHub({name, id }) {
  const { t } = useTranslation()

  const [newTopicFormVisible, setNewTopicFormVisible] = useState(false)
  const [topicsNotesVisible, setTopicsNotesVisible] = useState(false)
  const [topicCards, setTopicCards] = useState([])
  const [topics, setTopics] = useState([])
  const [activeTopic, setActiveTopic] = useState([])

useEffect(() => {
  getTopics()

} , [])

useEffect(() => {
  createTopicCards()
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

const createTopicCards = () => {
  let cards = []
  for (var topic of topics) {
    cards.push(<TopicCard title={topic.topic} description={topic.description} action={() => {setActiveTopic(topic);setTopicsNotesVisible(true)}}/>)
  }
  setTopicCards(cards)
}

  return (
    <ScrollView contentContainerStyle={styles.registerContainer}>
      {topicsNotesVisible ? <Topic {...activeTopic} setTopicsNotesVisible={setTopicsNotesVisible} topicsNotesVisible={topicsNotesVisible}/> :
      <View>
        <Text style={styles.headerStyle}>{name}</Text>
        {topicCards}
        <TopicCard title={t('new_topic')} action={setNewTopicFormVisible}/>
      </View>}
      <NewTopicForm newTopicFormVisible={newTopicFormVisible} setNewTopicFormVisible={setNewTopicFormVisible} groupId={id}/>
    </ScrollView>
  )
}
