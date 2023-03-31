import axios from 'axios'
import AppStorage from '../../utils/secure-store'

url = 'http://192.168.1.193:3000'

/**
 * Takes an axios HTTP request promise and handles its response and returns it
 * @param {*} request Request promise
 * @returns {*} Response to the request
 */
async function executeRequest(request) {
	return request
		.then((response) => {
			return response
		})
		.catch((error) => {
			return error.response
		})
}

/**
 * Post given data and execute the given callback based on the result.
 * @param {*} data Object that includes user data for registration.
 * @param {*} requestUrl The specific route that the request is made to.
 * @param {*} callbacks Object with optional callback functions named onSuccess, onError and onCompletion.
 */
async function postData(data, requestUrl) {
	const token = await AppStorage.getValueFor('loginInfo')
	return await executeRequest(
		axios.post(url + requestUrl, data, {
			headers: {
				authorization: token,
			},
		})
	)
}

/**
 * Get data and execute the given callback based on the result.
 * @param {*} requestUrl The specific route that the request is made to.
 * @param {*} callbacks Object with optional callback functions named onSuccess, onError and onCompletion.
 */
async function getData(requestUrl) {
	const token = await AppStorage.getValueFor('loginInfo')
	return await executeRequest(
		axios.get(url + requestUrl, {
			headers: {
				authorization: token,
			},
		})
	)
}

/**
 * Edit given data and execute the given callback based on the result.
 * @param {*} data Object that includes user data for registration.
 * @param {*} requestUrl The specific route that the request is made to.
 * @param {*} callbacks Object with optional callback functions named onSuccess, onError and onCompletion.
 */
async function putData(data, requestUrl) {
	const token = await AppStorage.getValueFor('loginInfo')
	return await executeRequest(
		axios.put(url + requestUrl, data, {
			headers: {
				authorization: token,
			},
		})
	)
}

/**
 *Delete wanted object and execute the given callback based on the result.
 * @param {*} requestUrl The specific route that the request is made to.
 * @param {*} callbacks Object with optional callback functions named onSuccess, onError and onCompletion.
 */
async function deleteData(requestUrl) {
	const token = await AppStorage.getValueFor('loginInfo')
	return await executeRequest(
		axios.delete(url + requestUrl, {
			headers: {
				authorization: token,
			},
		})
	)
}

export { postData, getData, putData, deleteData }
