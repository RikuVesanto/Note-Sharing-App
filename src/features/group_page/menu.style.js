import { StyleSheet } from 'react-native'

export default StyleSheet.create({
	menu: {
		width: '90%',
		alignSelf: 'center',
		backgroundColor: '#cccccc',
		flexDirection: 'column',
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
	//please change this
	bottomContainer: {
		marginTop: 70,
	},
})
