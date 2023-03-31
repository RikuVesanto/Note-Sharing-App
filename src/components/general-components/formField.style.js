import { StyleSheet } from 'react-native'

export default StyleSheet.create({
	inputContainer: {
		width: '80%',
		height: 70,
		alignSelf: 'center',
	},
	required: {
		position: 'absolute',
		zIndex: 99,
		right: 25,
		top: 4,
	},
	input: {
		alignSelf: 'center',
		backgroundColor: '#ffffff',
		height: 40,
		width: '90%',
		borderColor: '#777',
		color: '#8cbbf1',
		borderWidth: 0,
		borderRadius: 5,
		paddingLeft: 10,
		paddingRight: 10,
	},
	highInput: {
		height: 70,
	},
	highInputContainer: {
		width: '80%',
		height: 90,
		alignSelf: 'center',
	},
	inputError: {
		borderColor: 'red',
	},
	errorText: {
		position: 'absolute',
		top: 40,
		color: 'red',
		fontSize: 12,
		paddingLeft: 10,
	},
	formFieldImage: {
		height: 50,
		width: 50,
	},
	reveal: {
		position: 'absolute',
		zIndex: 99,
		right: 5,
		top: 2,
	},
	noteInput: {
		backgroundColor: 'transparent',
		borderBottomColor: 'black',
		borderWidth: 0,
		borderRadius: 0,
		borderBottomWidth: 1,
	},
	whiteText: {
		color: '#ffffff',
	},
})
