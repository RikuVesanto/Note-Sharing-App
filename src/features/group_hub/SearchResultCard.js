import { TouchableOpacity, Text, View } from 'react-native'
import styles from '../../utils/styles'
import '../language_select/i18n'
import { useTranslation } from 'react-i18next'

export default function SearchResultCard({
	name,
	description,
	action,
	groupId,
	usersGroups,
}) {
	const { t } = useTranslation()
	const alreadyJoined = usersGroups.filter((g) => g.name == name).length > 0

	return (
		<View style={styles.groupCard}>
			<View style={styles.groupCardLeft}>
				<Text style={styles.groupCardTitle}>{name}</Text>
				<Text style={styles.groupCardDescription}>{description}</Text>
			</View>
			<View style={styles.groupCardRight}>
				<TouchableOpacity
					style={[
						styles.joinGroupButton,
						alreadyJoined && styles.alreadyJoinedColor,
					]}
					onPress={() => {
						if (!alreadyJoined) action(groupId, name)
					}}
				>
					<Text style={styles.joinGroupButtonTitle}>
						{alreadyJoined ? t('already_joined') : t('join_group')}
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}
