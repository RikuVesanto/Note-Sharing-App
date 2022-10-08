import { showMessage } from 'react-native-flash-message'
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
 * checks if both the values are false and returns
 * @param {*} message the message that is displayed
 * @param {*} status changes what type of a message is displayed
 * @param {*} duration The duration the message is displayed for in milliseconds
 * @returns {*} false if both values are false otherwise true
 */
const checkForFalse = (bool1, bool2) => {
	if (bool1 == false && bool2 == false) {
		return false
	} else {
		return true
	}
}

export {
	addToUseState as addToUseState,
	showStatusMessage as showStatusMessage,
	checkForFalse as checkForFalse,
}
