import { Text, ScrollView, View } from 'react-native'
import React, { useState } from 'react'
import CreateGroupForm from './CreateGroupForm'
import GroupSearch from './GroupSearch'
import LargeButton from './LargeButton'
import BackButton from '../back_button/BackButton'
import '../language_select/i18n'
import { useTranslation } from 'react-i18next'
import styles from '../../utils/styles'

export default function GroupHub({ loginInfo}) {
  const { t } = useTranslation()
  const [createGroup, setCreateGroup] = useState(false)
  const [joinGroup, setJoinGroup] = useState(false)
  return (
    <ScrollView contentContainerStyle={styles.registerContainer}>
         {createGroup && <BackButton action={setCreateGroup}/>}
      <Text style={styles.headerStyle}>{t('group_hub')}</Text>
      {(!createGroup && !joinGroup) && <View><LargeButton title={t("create_group")} action={setCreateGroup}/><LargeButton title={t("join_group")} action={setJoinGroup}/></View>}
      {(createGroup) &&<CreateGroupForm loginInfo={loginInfo}/>}
      {(joinGroup) &&<GroupSearch setJoinGroup={setJoinGroup} userId={loginInfo.id}/>}
    </ScrollView>
  )
}
