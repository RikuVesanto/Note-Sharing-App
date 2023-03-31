import { deleteData } from './http-requests'

async function removeUserFromGroup(groupId, userId) {
	return await deleteData(`/groups/userconnection/${groupId}/${userId}`)
}

async function deleteNote(noteId) {
	return await deleteData(`/notes/note/${noteId}`)
}

export { removeUserFromGroup as removeUserFromGroup, deleteNote as deleteNote }
