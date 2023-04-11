import { TouchableOpacity, Text, View } from 'react-native'
import localStyles from './searchResultCard.style'
import '../../../../utils/i18n'
import { useTranslation } from 'react-i18next'
import {
	testEquality,
	getProperty,
} from '../../../../functions/general-functions'

export default function SearchResultCard({
	name,
	description,
	action,
	groupId,
	usersGroups,
}) {
	const { t } = useTranslation()

	const getGroupName = (group) => getProperty(group, 'name')
	const groupNames = usersGroups.map(getGroupName)
	const compareToGroup = (value) => testEquality(name, value)
	const alreadyJoined = groupNames.filter(compareToGroup).length > 0

	return (
		<View style={localStyles.groupCard}>
			<View style={localStyles.groupCardLeft}>
				<Text style={localStyles.groupCardTitle}>{name}</Text>
				<Text style={localStyles.groupCardDescription}>{description}</Text>
			</View>
			<View style={localStyles.groupCardRight}>
				<TouchableOpacity
					style={[
						localStyles.joinGroupButton,
						alreadyJoined && localStyles.alreadyJoinedColor,
					]}
					onPress={() => {
						if (!alreadyJoined) action(groupId, name)
					}}
				>
					<Text style={localStyles.joinGroupButtonTitle}>
						{alreadyJoined ? t('already_joined') : t('join_group')}
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}
