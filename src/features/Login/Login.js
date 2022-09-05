import { Text, TouchableOpacity, ScrollView } from 'react-native'
import LoginForm from './LoginForm'
import '../language-select/i18n'
import { useTranslation } from 'react-i18next'
import styles from '../../utils/styles'

export default function Login({ setLoginScreen, setLoggedIn }) {
  const { t } = useTranslation()

  return (
    <ScrollView contentContainerStyle={styles.registerContainer}>
      <Text style={styles.headerStyle}>{t('login')}</Text>
      <LoginForm setLoggedIn={setLoggedIn} />
      <TouchableOpacity onPress={() => setLoginScreen(false)}>
        <Text style={styles.hyperlink}>{t('gotoregister')}</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}
