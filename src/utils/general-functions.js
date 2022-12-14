import { showMessage } from 'react-native-flash-message'
import AppStorage from '../utils/secure-store'
import jwt_decode from 'jwt-decode'
import styles from './styles'

/**
 * Adds an item to the end of a usestate array.
 * @param {*} item the item to be added to the array.
 * @param {*} itemArray The contents of the current state array.
 * @param {*} setItemArray Setter for updating the state array.
 */
const addToUseState = (item, itemArray, setItemArray) => {
	//just adding more json data to the state variable doesn't cause a re render
	var tempArray = itemArray.slice()
	tempArray.push(item)
	setItemArray(tempArray)
}

/**
 * Shows a popup message on the screen for a moment
 * @param {*} message the message that is displayed
 * @param {*} status changes what type of a message is displayed
 * @param {*} duration The duration the message is displayed for in milliseconds
 */
const showStatusMessage = (message, status, duration = 1850) => {
	const style =
		status == 'success'
			? styles.successInfoMessage
			: status == 'failure'
			? styles.failureInfoMessage
			: styles.neutralInfoMessage
	const titleStyle =
		status == 'neutral'
			? (styles.infoMessageTitle, styles.infoMessageFontColorNeutral)
			: styles.infoMessageTitle
	showMessage({
		message: message,
		type: 'info',
		style: style,
		titleStyle: titleStyle,
		statusBarHeight: 30,
		duration: duration,
		autoHide: true,
	})
}

/**
 * checks if both the values are false
 * @param {*} bool1 first boolean value
 * @param {*} bool2 second boolean value
 * @returns {*} false if both values are false otherwise true
 */
const checkForFalse = (bool1, bool2) => {
	if (bool1 == false && bool2 == false) {
		return false
	} else {
		return true
	}
}

/**
 * Retrieves and returns the id of the user that's logged in
 * @returns {*} user id
 */
const getUserId = async () => {
	let userInfo = await AppStorage.getValueFor('loginInfo')
	let decoded = jwt_decode(userInfo)
	return decoded.id
}

/**
 * Checks if each value of the object matches each other, doesn't work for nested objects
 * @param {*} object1 first object being compared
 * @param {*} object2 second object being compared
 * @returns {*} true if every value matches, otherwise false
 */
const CheckForShallowObjectEquality = (object1, object2) => {
	const keys1 = Object.keys(object1)
	const keys2 = Object.keys(object2)

	if (keys1.length !== keys2.length) {
		return false
	}

	for (let key of keys1) {
		if (object1[key] !== object2[key]) {
			return false
		}
	}

	return true
}

export {
	addToUseState as addToUseState,
	showStatusMessage as showStatusMessage,
	checkForFalse as checkForFalse,
	getUserId as getUserId,
	CheckForShallowObjectEquality as CheckForShallowObjectEquality,
}
