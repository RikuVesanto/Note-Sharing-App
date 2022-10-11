import React, { useState, useEffect } from 'react'
import {
	ScrollView,
	Text,
	View,
	TouchableOpacity,
	ImageBackground,
} from 'react-native'
import '../language_select/i18n'
import { useTranslation } from 'react-i18next'
import styles from '../../utils/styles'
import NewTopicForm from './AddTopicForm'
import EditGroupInfoForm from './EditGroupInfoForm'
import Topic from '../topic_page/Topic'
import TopicCard from './TopicCard'
import Menu from './Menu'
import { getData } from '../../utils/http-requests'
import AppStorage from '../../utils/secure-store'
import jwt_decode from 'jwt-decode'

export default function GroupPage({
	id,
	name,
	description,
	setRefreshGroups,
	refreshGroups,
}) {
	const { t } = useTranslation()

	const [newTopicFormVisible, setNewTopicFormVisible] = useState(false)
	const [topicsNotesVisible, setTopicsNotesVisible] = useState(false)
	const [topicCards, setTopicCards] = useState([])
	const [topics, setTopics] = useState([])
	const [activeTopic, setActiveTopic] = useState([])
	const [refreshTopics, setRefreshTopics] = useState(false)
	const [menu, setMenu] = useState(false)
	const [EditGroupInfo, setEditGroupInfo] = useState(false)
	const [admin, setAdmin] = useState(false)

	useEffect(() => {
		async function fetchData() {
			let userInfo = await AppStorage.getValueFor('loginInfo')
			let decoded = jwt_decode(userInfo)
			await getCreator(id, decoded.id)
		}
		fetchData()
	}, [])

	useEffect(() => {
		getTopics()
	}, [refreshTopics])

	useEffect(() => {
		createTopicCards()
	}, [topics])

	const getCreator = async (groupId, userId) => {
		await getData(`/groups/group/creator/${groupId}/${userId}`, {
			onSuccess: async (response) => {
				setAdmin(response.data)
			},
			onError: (error) => {
				console.log(error)
			},
		})
	}

	const getTopics = async () => {
		await getData(`/topics/topiclist/${id}`, {
			onSuccess: async (response) => {
				setTopics(response.data)
			},
			onError: (error) => {
				console.log(error)
			},
		})
	}

	const createTopicCards = () => {
		let cards = []
		for (let topic of topics) {
			cards.push(
				<TopicCard
					key={topic.id}
					title={topic.topic}
					description={topic.description}
					action={() => {
						setActiveTopic(topic)
						setTopicsNotesVisible(true)
					}}
				/>
			)
		}
		setTopicCards(cards)
	}

	return (
		<ScrollView contentContainerStyle={styles.registerContainer}>
			{topicsNotesVisible ? (
				<Topic
					{...activeTopic}
					setTopicsNotesVisible={setTopicsNotesVisible}
				/>
			) : (
				<View>
					<View style={styles.topicHeaderLayout}>
						{EditGroupInfo && admin ? (
							<EditGroupInfoForm
								id={id}
								name={name}
								description={description}
								setEditGroupInfo={setEditGroupInfo}
								setRefreshGroups={setRefreshGroups}
								refreshGroups={refreshGroups}
							/>
						) : (
							<TouchableOpacity
								onPress={() => setEditGroupInfo(true)}
								style={styles.columnLayout}
							>
								<Text style={styles.topicHeader}>{name}</Text>
								<Text style={styles.topicHeaderDescription}>
									{description}
								</Text>
							</TouchableOpacity>
						)}
						<TouchableOpacity
							title="open"
							onPress={() => {
								setMenu(!menu)
							}}
						>
							<ImageBackground
								style={styles.menuButton}
								source={require('../../../assets/menu.png')}
								resizeMode="center"
							></ImageBackground>
						</TouchableOpacity>
					</View>
					{menu && (
						<Menu id={id} setRefreshGroups={setRefreshGroups} />
					)}
					{topicCards}
					<TopicCard
						title={t('new_topic')}
						action={setNewTopicFormVisible}
					/>
				</View>
			)}
			<NewTopicForm
				newTopicFormVisible={newTopicFormVisible}
				setNewTopicFormVisible={setNewTopicFormVisible}
				groupId={id}
				refreshTopics={refreshTopics}
				setRefreshTopics={setRefreshTopics}
			/>
		</ScrollView>
	)
}
