import * as SecureStore from 'expo-secure-store'

const save = async (key, value) => {
	await SecureStore.setItemAsync(key, value)
}

const getValueFor = async (key) => {
	return await SecureStore.getItemAsync(key)
}

export default {
	save: save,
	getValueFor: getValueFor,
}
