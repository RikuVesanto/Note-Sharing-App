import { StyleSheet } from 'react-native'

export default StyleSheet.create({
	appContainer: {
		flex: 1,
	},
	mainContainer: {
		backgroundColor: '#fceecb',
		height: '100%',
		paddingTop: 60,
	},
	largeHeader: {
		width: '90%',
		fontSize: 50,
		alignSelf: 'center',
		textAlign: 'center',
		marginBottom: 40,
		color: '#8cbbf1',
		/*backgroundColor: '#ffffff',
		borderColor: '#d7dde9',
		borderWidth: 1,
		borderRadius: 5,*/
	},
	mediumHeader: {
		width: '90%',
		fontSize: 36,
		color: '#8cbbf1',
	},
	smallHeader: {
		width: '90%',
		fontSize: 24,
		color: '#8cbbf1',
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
	highWidth: {
		width: '75%',
	},
	hyperlink: {
		fontSize: 14,
		textAlign: 'center',
		marginTop: 15,
		color: '#3464eb',
	},
	//form styling
	inputContainer: {
		width: '80%',
		height: 70,
		alignSelf: 'center',
	},
	slimInputContainer: {
		height: 40,
		width: '60%',
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
	button: {
		width: '40%',
		alignSelf: 'center',
		color: '#ffffff',
		backgroundColor: '#8cbbf1',
		borderColor: '#d7dde9',
		borderWidth: 1,
		borderRadius: 10,
	},
	formFieldImage: {
		height: 50,
		width: 50,
	},
	reveal: {
		position: 'absolute',
		zIndex: 99,
		right: 5,
		top: -4,
	},

	//language select
	languageButtonContainer: {
		marginTop: 25,
		marginLeft: 135,
		flexDirection: 'row',
	},
	leftLanguageButton: {
		alignSelf: 'center',
		height: 50,
		width: 50,
		marginRight: 25,
	},
	rightLanguageButton: {
		alignSelf: 'center',
		height: 50,
		width: 50,
	},
	//Large Button
	largeButton: {
		backgroundColor: '#8cbbf1',
		borderColor: '#d7dde9',
		borderWidth: 1,
		borderRadius: 10,
		padding: 10,
		marginTop: 50,
		marginLeft: '15%',
		width: '70%',
		height: 125,
		textAlign: 'center',
		marginTop: 35,
	},
	largeButtonText: {
		color: '#ffffff',
		fontSize: 28,
	},
	highInput: {
		height: 70,
	},
	highInputContainer: {
		width: '80%',
		height: 90,
		alignSelf: 'center',
	},
	//topic buttons
	topicButton: {
		backgroundColor: '#8cbbf1',
		marginLeft: '10%',
		marginTop: 30,
		width: '80%',
		height: 100,
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
	formTitle: {
		textAlign: 'center',
		fontSize: 24,
		marginTop: 5,
		marginBottom: 40,
	},
	//back button
	backButton: {
		marginLeft: 10,
		marginBottom: 10,
		height: 50,
		width: 50,
	},
	rowLayout: {
		flexDirection: 'row',
		marginTop: 10,
	},
	addnoteButton: {
		height: 50,
		width: 50,
		marginLeft: 40,
		marginTop: 30,
		marginBottom: 10,
	},
	//search
	resultsText: {
		textAlign: 'center',
		marginTop: 30,
		marginBottom: 30,
		fontSize: 20,
		color: '#8cbbf1',
	},
	//search result card
	groupCard: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		backgroundColor: '#8cbbf1',
		margin: 30,
		height: 150,
		borderRadius: 10,
	},
	groupCardLeft: {
		width: '50%',
		flexDirection: 'column',
		alignItems: 'center',
		paddingTop: 10,
		paddingLeft: 10,
		paddingBottom: 10,
	},
	groupCardRight: {
		width: '50%',
	},
	joinGroupButton: {
		backgroundColor: '#ffc14d',
		marginTop: 10,
		marginBottom: 10,
		marginLeft: 20,
		width: 130,
		height: 60,
		borderRadius: 15,
	},
	joinGroupButtonTitle: {
		textAlign: 'center',
		marginTop: 15,
		fontSize: 24,
		color: '#ffffff',
	},
	alreadyJoinedColor: {
		backgroundColor: '#66ff66',
		height: 80,
	},
	groupCardTitle: {
		textAlign: 'center',
		fontSize: 18,
		color: '#ffffff',
	},
	groupCardDescription: {
		textAlign: 'center',
		marginTop: 10,
		fontSize: 16,
		color: '#ffffff',
	},
	columnLayout: {
		flexDirection: 'column',
		alignItems: 'center',
	},
	//modal
	modal: {
		borderColor: '#d7dde9',
		borderWidth: 2,
		borderRadius: 5,
		marginLeft: '10%',
		width: '80%',
		marginTop: '20%',
		height: '50%',
		backgroundColor: '#fceecb',
	},
	//topic page title view
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
	//note creation form styling
	noteContainer: {
		width: '80%',
		height: 70,
		alignSelf: 'center',
	},
	noteInput: {
		backgroundColor: 'transparent',
		borderBottomColor: 'black',
		borderWidth: 0,
		borderRadius: 0,
		borderBottomWidth: 1,
	},
	titleErrorText: {
		position: 'absolute',
		top: 45,
	},
	contentErrorText: {
		position: 'absolute',
		top: 85,
	},

	logoutButton: {
		alignSelf: 'center',
		height: 50,
		width: 50,
		marginBottom: 30,
	},
	buttonContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
	},
	deleteButton: {
		alignSelf: 'center',
		height: 50,
		width: 50,
		marginTop: 10,
		marginRight: 10,
	},
	editButton: {
		alignSelf: 'center',
		marginTop: 10,
		height: 50,
		width: 50,
	},
	menuButton: {
		position: 'absolute',
		zIndex: 99,
		right: 40,
		top: -35,
		height: 25,
		width: 25,
	},
	menu: {
		width: '90%',
		alignSelf: 'center',
		backgroundColor: '#cccccc',
		flexDirection: 'column',
	},
	leaveGroupButton: {
		height: 50,
		width: 50,
		marginBottom: 30,
	},
	userListTitle: {
		fontSize: 26,
		textAlign: 'center',
		fontSize: 26,
		marginRight: 20,
	},
	userListItem: {
		marginLeft: '10%',
		width: '80%',
		backgroundColor: '#b3e0ff',
		padding: 15,
		marginBottom: 5,
	},
	headerView: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
	},
	headerViewLeft: {
		width: '75%',
		alignItems: 'center',
	},
	headerViewRight: {
		width: '25%',
	},
	headerForm: {
		width: '80%',
		alignSelf: 'center',
		backgroundColor: '#ffffff',
		borderColor: '#777',
		borderWidth: 1,
	},
	closeButtonImage: {
		height: 25,
		width: 25,
	},
	icon: {
		height: 40,
		width: 40,
	},
	//please change this
	bottomContainer: {
		marginTop: 70,
	},
	marginLeftBottom: {
		marginLeft: 15,
		marginBottom: 40,
	},
	marginTop: {
		marginTop: 20,
	},
	marginBottom: {
		marginBottom: 25,
	},
	whiteText: {
		color: '#ffffff',
	},
	alternateButton: {
		backgroundColor: '#ffc14d',
	},
})
