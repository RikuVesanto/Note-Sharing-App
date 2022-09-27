/**
 * Adds an item to the end of a usestate array.
 * @param {*} item the item to be added to the array.
 * @param {*} itemArray The contents of the current array.
 * @param {*} setItemArray Setter for updating the array.
 */
const addToUseState = (item, itemArray, setItemArray) => {
    var tempArray = itemArray
    tempArray.concat(item)
    setItemArray(tempArray)
  }

export default addToUseState
