import { StyleSheet } from 'react-native'

export default StyleSheet.create({
	menu: {
		width: '82%',
		alignSelf: 'center',
		backgroundColor: '#d7dde9',
		flexDirection: 'column',
		zIndex: 1,
		elevation: 1,
		position: 'absolute',
		top: 20,
		borderRadius: 15,
	},
	userListTitle: {
		fontSize: 26,
		textAlign: 'center',
		fontSize: 26,
	},
	userListItem: {
		marginLeft: '10%',
		width: '80%',
		backgroundColor: '#8cbbf1',
		padding: 15,
		marginBottom: 5,
	},
	itemText: {
		fontSize: 20,
		color: '#ffffff',
		marginRight: 8,
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
	deleteButton: {
		width: 45,
		height: 45,
	},
})
