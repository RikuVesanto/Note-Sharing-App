import { getData } from './http-requests'

async function checkLoginDetails(values) {
	return await getData(`/users/user/${values.username}/${values.password}`)
}

async function getUsersGroups(userId) {
	return await getData(`/groups/grouplist/${userId}`)
}

async function getUserInfo(userId) {
	return await getData(`/users/user/${userId}`)
}

async function getGroupsBySearchWord(values) {
	return await getData(`/groups/searchlist/${values.search}`)
}

async function getGroupsUserList(userId) {
	return await getData(`/groups/userlist/${userId}`)
}

async function getTopics(groupId) {
	return await getData(`/topics/topiclist/${groupId}`)
}

async function getGroupsCreator(groupId, userId) {
	return await getData(`/groups/group/creator/${groupId}/${userId}`)
}

async function getTopicsNotes(topicId) {
	return await getData(`/notes/notelist/${topicId}`)
}

export {
	checkLoginDetails as checkLoginDetails,
	getUsersGroups as getUsersGroups,
	getUserInfo as getUserInfo,
	getGroupsBySearchWord as getGroupsBySearchWord,
	getGroupsUserList as getGroupsUserList,
	getTopics as getTopics,
	getGroupsCreator as getGroupsCreator,
	getTopicsNotes as getTopicsNotes,
}
