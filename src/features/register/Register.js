import { Text, TouchableOpacity, ScrollView } from 'react-native'
import RegisterForm from './RegisterForm'
import '../language-select/i18n'
import { useTranslation } from 'react-i18next'
import styles from '../../utils/styles'

function Register() {
  const { t } = useTranslation()
  return (
    <ScrollView contentContainerStyle={styles.registerContainer}>
      <Text style={styles.headerStyle}>{t('register')}</Text>
      <RegisterForm />
      <TouchableOpacity onPress={() => console.log()}>
        <Text style={styles.hyperlink}>{t('gotologin')}</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

export default Register
