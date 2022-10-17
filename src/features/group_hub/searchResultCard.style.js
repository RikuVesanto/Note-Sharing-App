import { StyleSheet } from 'react-native'

export default StyleSheet.create({
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
})
