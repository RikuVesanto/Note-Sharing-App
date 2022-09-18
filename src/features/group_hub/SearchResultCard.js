import { TouchableOpacity, Text, View } from 'react-native'
import styles from '../../utils/styles'
import { useTranslation } from 'react-i18next'
import i18n from '../language_select/i18n'

export default function SearchResultCard({name,description, action, groupId}) {
    const { t } = useTranslation()

  return (
    <View>
        <Text style={styles.newTopicTitle}>{name}</Text>
        <Text style={styles.topicDescription}>{description}</Text>
    <TouchableOpacity style={styles.topicButton} onPress={() => action(groupId)}>
        <Text style={styles.newTopicTitle}>{i18n.t('join_group')}</Text>
    </TouchableOpacity>
    </View>
  )
}
