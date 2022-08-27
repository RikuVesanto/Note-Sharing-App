import { View, ImageBackground } from 'react-native'
import Register from './src/features/register/Register'
import ChangeLanguage from './src/features/language-select/ChangeLanguage'
import styles from './src/utils/styles'
import background from './assets/school_background.jpg'

export default function App() {
  return (
    <View style={styles.appContainer}>
      <ImageBackground
        source={background}
        resizeMode="cover"
        style={styles.imageBackground}
      >
        <Register />
        <ChangeLanguage />
      </ImageBackground>
    </View>
  )
}
