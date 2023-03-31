import { postData } from './http-requests'
import { filterObject } from '../object-functions'

async function addUser(values) {
	const userData = filterObject(
		{
			...values,
		},
		(value) => value !== ''
	)
	return await postData(userData, '/users/user')
}

async function addGroup(values, userId) {
	const groupData = filterObject(
		{
			...values,
			creatorId: userId,
		},
		(value) => value !== ''
	)
	return await postData(groupData, '/groups/group')
}

async function addUserToGroup(groupId, userId) {
	const values = {
		userId: userId,
		groupId: groupId,
	}
	return await postData(values, '/groups/userconnection/')
}

async function addTopic(values, groupId) {
	const topicData = filterObject(
		{
			...values,
			groupId: groupId,
		},
		(value) => value !== ''
	)
	return await postData(topicData, '/topics/topic')
}

async function addNote(values, topicId) {
	const noteData = filterObject(
		{
			...values,
			topicId: topicId,
		},
		(value) => value !== ''
	)
	return await postData(noteData, '/notes/note/')
}

export {
	addUser as addUser,
	addUserToGroup as addUserToGroup,
	addGroup as addGroup,
	addTopic as addTopic,
	addNote as addNote,
}
