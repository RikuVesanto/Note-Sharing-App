import { Text, TouchableOpacity, ScrollView } from 'react-native'
import RegisterForm from './RegisterForm'
import i18n from '../language_select/i18n'
import styles from '../../utils/styles'

export default function Register({ setLoginPage }) {
  return (
    <ScrollView contentContainerStyle={styles.registerContainer}>
      <Text style={styles.headerStyle}>{i18n.t('register')}</Text>
      <RegisterForm />
      <TouchableOpacity onPress={() => setLoginPage(true)}>
        <Text style={styles.hyperlink}>{i18n.t('gotologin')}</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}
