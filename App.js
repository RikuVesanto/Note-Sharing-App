import React, { useState } from 'react'
import { View, ImageBackground } from 'react-native'
import Register from './src/features/register/Register'
import Login from './src/features/Login/Login'
import ChangeLanguage from './src/features/language-select/ChangeLanguage'
import styles from './src/utils/styles'
import background from './assets/school_background.jpg'

export default function App() {
  const [loginScreen, setLoginScreen] = useState(true)
  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <View style={styles.appContainer}>
      <ImageBackground
        source={background}
        resizeMode="cover"
        style={styles.imageBackground}
      >
        {loginScreen ? (
          <Login setLoginScreen={setLoginScreen} setLoggedIn={setLoggedIn} />
        ) : (
          <Register setLoginScreen={setLoginScreen} />
        )}
        <ChangeLanguage />
      </ImageBackground>
    </View>
  )
}
