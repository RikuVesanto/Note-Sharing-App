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
import styles from '../../../utils/styles'
import localStyles from './groupPage.style'
import AddTopicForm from './AddTopicForm'
import EditGroupInfoForm from './EditGroupInfoForm'
import Topic from '../topic_page/Topic'
import TopicCard from './TopicCard'
import Menu from './Menu'
import { getData } from '../../../functions/http_functions/http-requests'
import { getUserId } from '../../../functions/general-functions'

export default function GroupPage({
	id,
	name,
	description,
	setRefreshGroups,
	refreshGroups,
	setNeedToNavigate,
	setNavigate,
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
	const [userId, setUserId] = useState(false)

	useEffect(() => {
		async function fetchData() {
			const tempId = await getUserId()
			setUserId(tempId)
			await getCreator(id, tempId)
		}
		fetchData()
	}, [])

	useEffect(() => {
		getTopics()
	}, [refreshTopics])

	useEffect(() => {
		setTopicCards(
			topics.map((topic) =>
				topicCard(topic, () => {
					setActiveTopic(topic)
					setTopicsNotesVisible(true)
				})
			)
		)
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

	const topicCard = (topic, action) => {
		return (
			<TopicCard
				key={topic.id}
				title={topic.topic}
				description={topic.description}
				action={action}
			/>
		)
	}

	return (
		<View style={styles.mainContainer}>
			{topicsNotesVisible ? (
				<Topic
					{...activeTopic}
					setTopicsNotesVisible={setTopicsNotesVisible}
					setRefreshTopics={setRefreshTopics}
					refreshTopics={refreshTopics}
					setActiveTopic={setActiveTopic}
				/>
			) : (
				<View>
					<TouchableOpacity
						style={localStyles.menuButton}
						title="open"
						onPress={() => {
							setEditGroupInfo(false)
							setMenu(!menu)
						}}
					>
						<ImageBackground
							style={localStyles.menuButtonImage}
							source={require('../../../../assets/menu.png')}
							resizeMode="center"
						></ImageBackground>
					</TouchableOpacity>

					{EditGroupInfo && !menu && admin ? (
						<EditGroupInfoForm
							id={id}
							name={name}
							description={description}
							setEditGroupInfo={setEditGroupInfo}
							setRefreshGroups={setRefreshGroups}
							refreshGroups={refreshGroups}
							setNeedToNavigate={setNeedToNavigate}
							setNavigate={setNavigate}
						/>
					) : (
						<TouchableOpacity
							onPress={() => setEditGroupInfo(true)}
							style={localStyles.headerButton}
						>
							<Text style={[styles.mediumHeader, styles.centerText]}>
								{name}
							</Text>
							<Text
								style={[styles.text, styles.centerText, styles.marginBottom]}
							>
								{description}
							</Text>
						</TouchableOpacity>
					)}

					{menu && (
						<Menu
							id={id}
							setRefreshGroups={setRefreshGroups}
							refreshGroups={refreshGroups}
							userId={userId}
							admin={admin}
							getCreator={getCreator}
						/>
					)}
					<ScrollView>
						{topicCards}
						<TopicCard title={t('new_topic')} action={setNewTopicFormVisible} />
					</ScrollView>
				</View>
			)}
			<AddTopicForm
				newTopicFormVisible={newTopicFormVisible}
				setNewTopicFormVisible={setNewTopicFormVisible}
				groupId={id}
				refreshTopics={refreshTopics}
				setRefreshTopics={setRefreshTopics}
			/>
		</View>
	)
}
