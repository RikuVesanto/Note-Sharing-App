/**
 * Filters an object based on a given condition
 * @param {*} object The object being filtered
 * @param {*} predicate The function used for filtering values
 * @returns {*} The filtered object
 */
const filterObject = (object, predicate) => {
	return Object.keys(object)
		.filter((key) => predicate(object[key]))
		.reduce((result, key) => {
			result[key] = object[key]
			return result
		}, {})
}

export { filterObject as filterObject }
