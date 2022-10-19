import { StyleSheet } from 'react-native'

export default StyleSheet.create({
	//core global styles
	appContainer: {
		flex: 1,
	},
	mainContainer: {
		backgroundColor: '#fceecb',
		height: '100%',
	},
	largeHeader: {
		width: '90%',
		fontSize: 50,
		alignSelf: 'center',
		textAlign: 'center',
		marginBottom: 40,
		color: '#8cbbf1',
		marginTop: 30,
	},
	mediumHeader: {
		fontSize: 36,
		color: '#8cbbf1',
		marginTop: 10,
	},
	smallHeader: {
		width: '90%',
		fontSize: 24,
		color: '#8cbbf1',
		marginTop: 10,
	},
	text: {
		width: '90%',
		fontSize: 16,
		color: '#8cbbf1',
	},
	centerText: {
		alignSelf: 'center',
		textAlign: 'center',
	},
	hyperlink: {
		fontSize: 14,
		textAlign: 'center',
		marginTop: 15,
		color: '#3464eb',
	},
	button: {
		width: '40%',
		alignSelf: 'center',
		color: '#ffffff',
		backgroundColor: '#8cbbf1',
		borderColor: '#d7dde9',
		borderWidth: 1,
		borderRadius: 10,
	},
	marginTop: {
		marginTop: 35,
	},
	topicTitle: {
		textAlign: 'center',
		marginTop: 10,
		fontSize: 20,
		color: '#ffffff',
	},
	topicDescription: {
		textAlign: 'center',
		marginTop: 10,
		fontSize: 14,
		color: '#ffffff',
	},
	rowLayout: {
		flexDirection: 'row',
		marginTop: 10,
	},
	columnLayout: {
		flexDirection: 'column',
		alignItems: 'center',
	},
	//more niche global styles
	noteCard: {
		padding: 5,
		marginTop: 20,
		marginBottom: 20,
		alignSelf: 'center',
		width: '80%',
		backgroundColor: '#8cbbf1',
		borderColor: '#777',
		borderWidth: 1,
		borderRadius: 10,
	},
	logoutButton: {
		alignSelf: 'center',
		height: 50,
		width: 50,
		marginBottom: 30,
	},
	headerForm: {
		width: '80%',
		alignSelf: 'center',
		backgroundColor: '#ffffff',
		borderColor: '#777',
		borderWidth: 1,
	},
	marginLeftBottom: {
		marginLeft: 15,
		marginBottom: 40,
	},
	marginTop: {
		marginTop: 20,
	},
	largeMarginTop: {
		marginTop: 40,
	},
	marginBottom: {
		marginBottom: 25,
	},
	largeMarginRight: {
		marginRight: 60,
	},
	alternateButton: {
		backgroundColor: '#ffc14d',
	},
	//info messages
	successInfoMessage: {
		backgroundColor: '#4dff88',
	},
	failureInfoMessage: {
		backgroundColor: '#ff4d4d',
	},
	neutralInfoMessage: {
		backgroundColor: '#b3ffff',
		color: 'black',
	},
	infoMessageTitle: {
		fontSize: 16,
	},
	infoMessageFontColorNeutral: {
		color: '#000000',
	},
	//App.js style
	icon: {
		height: 40,
		width: 40,
	},
})
