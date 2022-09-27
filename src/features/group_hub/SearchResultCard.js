import { TouchableOpacity, Text, View } from 'react-native'
import { Divider } from 'react-native-paper';
import styles from '../../utils/styles'
import i18n from '../language_select/i18n'

export default function SearchResultCard({name,description, action, groupId}) {

  return (
    <View style={styles.groupCard}>
        <View style={styles.groupInfoColumn}>
        <Text style={styles.groupCardTitle}>{name}</Text>
        <Text style={styles.groupCardDescription}>{description}</Text>
        </View>
        <TouchableOpacity style={styles.joinGroupButton} onPress={() => action(groupId)}>
            <Text style={styles.joinGroupButtonTitle}>{i18n.t('join_group')}</Text>
        </TouchableOpacity>
        <Divider style={{ height: 1}} />
    </View>
  )
}
