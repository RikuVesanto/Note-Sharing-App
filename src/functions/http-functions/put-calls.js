import { putData } from './http-requests'
import { filterObject } from '../object-functions'

async function changeUsersPassword(values, userId) {
	const data = {
		id: userId,
		oldPassword: values.oldPassword,
		password: values.password,
	}
	return await putData(data, '/users/user/password')
}

async function changeUserInfo(values, userId) {
	const data = {
		id: userId,
		email: values.email,
		username: values.username,
		name: values.name,
	}
	return await putData(data, '/users/user')
}

async function changeGroupAdmin(groupId, userId) {
	const data = { groupId: groupId, userId: userId }
	return await putData(data, `/groups/creator`)
}

async function changeGroupInfo(values, groupId) {
	const groupData = filterObject(
		{
			...values,
			groupId: groupId,
		},
		(value) => value !== ''
	)
	return await putData(groupData, `/groups/group/`)
}

async function editTopicInfo(values, topicId) {
	const topicData = filterObject(
		{
			...values,
			id: topicId,
		},
		(value) => value !== ''
	)
	return await putData(topicData, `/topics/topic/`)
}

async function editNote(values, noteId) {
	const noteData = filterObject(
		{
			...values,
			noteId: noteId,
		},
		(value) => value !== ''
	)
	return await putData(noteData, `/notes/note/${noteId}`)
}

export {
	changeUsersPassword as changeUsersPassword,
	changeUserInfo as changeUserInfo,
	changeGroupAdmin as changeGroupAdmin,
	changeGroupInfo as changeGroupInfo,
	editTopicInfo as editTopicInfo,
	editNote as editNote,
}
