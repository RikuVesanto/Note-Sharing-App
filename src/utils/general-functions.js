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

export default addToUseState
