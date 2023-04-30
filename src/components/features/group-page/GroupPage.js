import React, { useState, useEffect } from 'react'
import {
	ScrollView,
	Text,
	View,
	TouchableOpacity,
	ImageBackground,
} from 'react-native'
import '../../../utils/i18n'
import { useTranslation } from 'react-i18next'
import styles from '../../../utils/styles'
import localStyles from './groupPage.style'
import AddTopicForm from './UI-components/AddTopicForm'
import EditGroupInfoForm from './UI-components/EditGroupInfoForm'
import Topic from '../topic-page/Topic'
import TopicCard from './UI-components/TopicCard'
import Menu from '../group-menu/Menu'
import { getUserId } from '../../../functions/general-functions'
import {
	getTopics,
	getGroupsCreator,
} from '../../../functions/http-functions/get-calls'
import { addTopic } from '../../../functions/http-functions/post-calls'
import { changeGroupInfo } from '../../../functions/http-functions/put-calls'
import {
	showStatusMessage,
	delaySecondExecution,
} from '../../../functions/general-functions'
import { useNavigation } from '@react-navigation/native'

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
	const [activeTopic, setActiveTopic] = useState([])
	const [refreshTopics, setRefreshTopics] = useState(false)
	const [menu, setMenu] = useState(false)
	const [EditGroupInfo, setEditGroupInfo] = useState(false)
	const [admin, setAdmin] = useState(false)
	const [userId, setUserId] = useState(false)

	const navigation = useNavigation()
	const submitEditGroupInfoFormWithBreak = delaySecondExecution(
		submitEditGroupInfoForm
	)
	const submitTopicFormWithBreak = delaySecondExecution(submitTopicForm)

	useEffect(() => {
		;(async () => {
			const tempId = await getUserId()
			setUserId(tempId)
			const response = await getGroupsCreator(id, tempId)
			if (response.status === 200) {
				setAdmin(response.data)
			}
		})()
	}, [])

	useEffect(() => {
		;(async () => {
			const response = await getTopics(id)
			if (response.status === 200) {
				const topics = response.data
				setTopicCards(
					topics.map((topic) =>
						topicCard(
							topic.topic,
							topic.description,
							() => {
								setActiveTopic(topic)
								setTopicsNotesVisible(true)
							},
							topic.id
						)
					)
				)
			}
		})()
	}, [refreshTopics])

	const topicCard = (title, description, action, key) => {
		return (
			<TopicCard
				key={key}
				title={title}
				description={description}
				action={action}
			/>
		)
	}

	async function submitEditGroupInfoForm(values) {
		const response = await changeGroupInfo(values, id)
		if (response.status === 200) {
			showStatusMessage(response.data, 'success')
			setNeedToNavigate(true)
			const object = {}
			object.navigate = () => {
				setNeedToNavigate(false)
				navigation.navigate(values.name)
			}
			setNavigate(object)
			setRefreshGroups(!refreshGroups)
			setEditGroupInfo(false)
		} else {
			showStatusMessage(response.data, 'failure')
		}
	}

	async function submitTopicForm(values) {
		const response = await addTopic(values, id)
		if (response.status === 201) {
			showStatusMessage(response.data, 'success')
			setRefreshTopics(!refreshTopics)
			setNewTopicFormVisible(false)
		} else {
			showStatusMessage(error.data.message, 'failure')
		}
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

					{EditGroupInfo && !menu ? (
						<EditGroupInfoForm
							name={name}
							description={description}
							setEditGroupInfo={setEditGroupInfo}
							action={submitEditGroupInfoFormWithBreak}
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
							setAdmin={setAdmin}
						/>
					)}
					<ScrollView>
						{topicCards}
						<TopicCard title={t('new_topic')} action={setNewTopicFormVisible} />
					</ScrollView>
				</View>
			)}
			<AddTopicForm
				showForm={newTopicFormVisible}
				goBack={setNewTopicFormVisible}
				action={submitTopicFormWithBreak}
			/>
		</View>
	)
}
