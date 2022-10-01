import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import Register from './src/features/register/Register'
import Login from './src/features/login/Login'
import ChangeLanguage from './src/features/language_select/ChangeLanguage'
import GroupHub from './src/features/group_hub/GroupHub'
import GroupPage from './src/features/group_page/GroupPage'
import styles from './src/utils/styles'
import { getData } from './src/utils/http-requests'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

export default function App() {
  const [loginPage, setLoginPage] = useState(true)
  const [loginInfo, setLoginInfo] = useState("")
  const [groups, setGroups] = useState([])
  const [groupScreens, setGroupScreens] = useState([])
  const [needToNavigate, setNeedToNavigate] = useState(false)
  const [readyToNavigate, setReadyToNavigate] = useState(false)

  useEffect(() => {
    if (loginInfo != "") {
      getGroups()
    }
  } , [loginInfo])

  useEffect(() => {
    createGroupScreens()
  } , [groups])

  useEffect(() => {
    if (needToNavigate) {
      setReadyToNavigate(true)
    }
  } , [groupScreens])

  const getGroups = async () => {
      await getData(`/groups/grouplist/${loginInfo.id}`, {
          onSuccess: async (response) => {
            //console.log(response.data)
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
      //using closure so the group that's passed to GroupPage isn't always the last one that's iterated
      let x = group
      if (!list.includes(group.name)) {
          screens.push(<Drawer.Screen key={group.id} name={group.name} children={() => <GroupPage {...x} />}/>)
          list.push(group.name)
      }
    }
    setGroupScreens(screens)
  }

  let loggedInScreen = <NavigationContainer>
  <Drawer.Navigator>
  {groupScreens}
  <Drawer.Screen name="Group Hub" children={() => <GroupHub loginInfo={loginInfo} groups={groups} 
  setGroups={setGroups} setNeedToNavigate={setNeedToNavigate} 
  readyToNavigate={readyToNavigate} setReadyToNavigate={setReadyToNavigate}/>} />
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
