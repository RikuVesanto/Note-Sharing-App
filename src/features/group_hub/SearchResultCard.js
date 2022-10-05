import { TouchableOpacity, Text, View } from 'react-native'
import { Divider } from 'react-native-paper';
import styles from '../../utils/styles'
import '../language_select/i18n'
import { useTranslation } from 'react-i18next'

export default function SearchResultCard({name,description, action, groupId}) {
  const { t } = useTranslation()
  
  return (
    <View style={styles.groupCard}>
        <View style={styles.groupCardLeft}>
            <Text style={styles.groupCardTitle}>{name}</Text>
            <Text style={styles.groupCardDescription}>{description}</Text>
        </View>
        <View style={styles.groupCardRight}>
          <TouchableOpacity style={styles.joinGroupButton} onPress={() => action(groupId, name)}>
            <Text style={styles.joinGroupButtonTitle}>{t('join_group')}</Text>
          </TouchableOpacity>
        </View>
        <Divider style={{ height: 1}} />
    </View>
  )
}
