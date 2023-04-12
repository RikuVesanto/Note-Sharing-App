import { TouchableOpacity, Text, View } from 'react-native'
import localStyles from './searchResultCard.style'
import '../../../../utils/i18n'
import { useTranslation } from 'react-i18next'
import {
	objectArrayToPropertyArray,
	valueInArray,
} from '../../../../functions/general-functions'

export default function SearchResultCard({
	name,
	description,
	action,
	groupId,
	usersGroups,
}) {
	const { t } = useTranslation()

	const inGroup = valueInArray(
		objectArrayToPropertyArray(usersGroups, 'name'),
		name,
		1
	)

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
						inGroup && localStyles.alreadyJoinedColor,
					]}
					onPress={() => {
						if (!inGroup) action(groupId, name)
					}}
				>
					<Text style={localStyles.joinGroupButtonTitle}>
						{inGroup ? t('already_joined') : t('join_group')}
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}
