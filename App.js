import React, { useState, useEffect } from 'react'
import { View, ImageBackground } from 'react-native'
import Register from './src/features/register/Register'
import Login from './src/features/login/Login'
import ChangeLanguage from './src/features/language_select/ChangeLanguage'
import GroupHub from './src/features/group_hub/GroupHub'
import GroupPage from './src/features/group_list/GroupPage'
import styles from './src/utils/styles'
import background from './assets/school_background.jpg'
import { getData } from './src/utils/http-requests'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

export default function App() {
  const [loginPage, setLoginPage] = useState(true)
  const [loginInfo, setLoginInfo] = useState("")
  const [groups, setGroups] = useState("")
  const [groupScreens, setGroupScreens] = useState([])

  useEffect(() => {
    getGroups()
  } , [loginInfo])

  useEffect(() => {
    createGroupScreens()
} , [groups])


  const getGroups = async () => {
      await getData(`/groups/grouplist/${loginInfo.id}`, {
          onSuccess: async (response) => {
            setGroups(response.data)
          },
          onError: (error) => {
            console.log(error)
            let message = ''
            if (error.response.status === 500) {
              message = i18n.t('register_form_error')
            } else {
              message = error.response.data
            }
          },
        })
  }

  const createGroupScreens = () => {
    let screens = []
    let list = []
    for (var group of groups) {
      if (list.includes(group.name)) {
      } else {
      screens.push(<Drawer.Screen key={group.name} name={group.name} component={GroupPage} />)
      list.push(group.name)
      }
    }
    setGroupScreens(screens)
}

  let loggedInScreen = <NavigationContainer>
  <Drawer.Navigator>
    {groupScreens}
  <Drawer.Screen name="bi" component={GroupHub} />
  </Drawer.Navigator>
</NavigationContainer>

  const loginScreen = loginPage ? (
    <Login setLoginPage={setLoginPage} setLoginInfo={setLoginInfo} />
  ) : (
    <Register setLoginPage={setLoginPage} />
  )

  return (
    <View style={styles.appContainer}>
      {loginInfo != "" ? loggedInScreen : loginScreen}
      <ChangeLanguage />
    </View>
  )
}
