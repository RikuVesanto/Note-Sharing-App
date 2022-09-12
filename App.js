import React, { useState } from 'react'
import { View, ImageBackground } from 'react-native'
import Register from './src/features/register/Register'
import Login from './src/features/login/Login'
import ChangeLanguage from './src/features/language-select/ChangeLanguage'
import GroupHub from './src/features/group_hub/GroupHub'
import styles from './src/utils/styles'
import background from './assets/school_background.jpg'

export default function App() {
  const [loginPage, setLoginPage] = useState(true)
  const [loginInfo, setLoginInfo] = useState("")

  let loggedInScreen = <GroupHub />

  const loginScreen = loginPage ? (
    <Login setLoginPage={setLoginPage} setLoginInfo={setLoginInfo} />
  ) : (
    <Register setLoginPage={setLoginPage} />
  )

  return (
    <View style={styles.appContainer}>
      <ImageBackground
        source={background}
        resizeMode="cover"
        style={styles.imageBackground}
      >
      {loginInfo != "" ? loggedInScreen : loginScreen}
      <ChangeLanguage />
      </ImageBackground>
    </View>
  )
}
