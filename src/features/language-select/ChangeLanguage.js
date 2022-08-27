import { TouchableOpacity, Text, View, ImageBackground } from 'react-native'
import './i18n'
import { useTranslation } from 'react-i18next'
import i18n from 'i18next'
import AppStorage from '../../utils/secure-store'
import styles from '../../utils/styles'

function ChangeLanguage(props) {
  const { t } = useTranslation()

  const changeLanguage = async (value) => {
    i18n
      .changeLanguage(value)
      .then(() => AppStorage.save('language', value))
      .catch((err) => console.log(err))
  }

  return (
    <View>
      <Text style={styles.languageSelectTitle}>{t('language')}</Text>
      <View style={styles.languageButtonContainer}>
        <TouchableOpacity title="FI" onPress={() => changeLanguage('fi')}>
          <ImageBackground
            style={styles.leftLanguageButton}
            source={require('../../../assets/finnish_flag.png')}
            resizeMode="center"
          ></ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity title="EN" onPress={() => changeLanguage('en')}>
          <ImageBackground
            style={styles.rightLanguageButton}
            source={require('../../../assets/english_flag.png')}
            resizeMode="center"
          ></ImageBackground>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ChangeLanguage
