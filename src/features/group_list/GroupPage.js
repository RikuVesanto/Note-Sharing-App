import { ScrollView } from 'react-native'
import '../language_select/i18n'
import { useTranslation } from 'react-i18next'
import styles from '../../utils/styles'

export default function GroupHub() {
  const { t } = useTranslation()

  return (
    <ScrollView contentContainerStyle={styles.registerContainer}>
    </ScrollView>
  )
}
