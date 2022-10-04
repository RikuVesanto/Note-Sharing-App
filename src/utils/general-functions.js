import { showMessage} from "react-native-flash-message";
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

const showStatusMessage = (message, status) => {
  console.log(message)
  const style = status == "success" ? styles.successInfoMessage : (status == "failure" ? styles.failureInfoMessage : styles.neutralInfoMessage);
  const titleStyle = status == "neutral" ? (styles.infoMessageTitle,styles.infoMessageFontColorNeutral) : styles.infoMessageTitle
  showMessage({
    message:message,
    type: "info",
    style: style,
    titleStyle: titleStyle,
    statusBarHeight: 30
  });
}

export {addToUseState as addToUseState, showStatusMessage as showStatusMessage}
