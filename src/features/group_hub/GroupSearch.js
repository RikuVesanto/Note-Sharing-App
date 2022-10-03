import React, { useState, useEffect } from 'react'
import {View, Text} from 'react-native'
import styles from '../../utils/styles'
import { Button } from '@rneui/themed'
import { Formik } from 'formik'
import { SearchValidationSchema } from '../../utils/validation-schemas'
import { useTranslation } from 'react-i18next'
import '../language_select/i18n'
import { getData, postData } from '../../utils/http-requests'
import SearchResultCard from './SearchResultCard'
import FormField from '../general_components/FormField'
import BackButton from '../general_components/BackButton'

export default function GroupSearch({userId,setJoinGroup, setNeedToNavigate, readyToNavigate, setReadyToNavigate}) {
    const { t } = useTranslation()
    const [groups, setGroups] = useState("")
    const [searchResultCards, setSearchResultCards] = useState([])
    const [navigationLocation, setNavigationLocation] = useState("")

    useEffect(() => {
      if (groups != "") {
        createSearchResultCards()
      }
    } , [groups])

    useEffect(() => {
      if (readyToNavigate) {
        console.log("bonk")
        setReadyToNavigate(false)
        setNeedToNavigate(false)
        navigation.navigate(navigationLocation)
        setJoinGroup(false)
      } else {
        console.log("bah")
      }
    },[readyToNavigate])

    const createSearchResultCards = () => {
        let screens = []
        let results = 0
        for (var group of groups) {
          screens.push(<SearchResultCard key={group.id} name={group.name} description={group.description} action={joinGroup} groupId={group.id}/>)
          results++
        }
        screens.unshift(<Text key="results" style={styles.resultsText}>{results + " " + t('results_found')}</Text>)
        setSearchResultCards(screens)
    }

    const joinGroup = async (groupId, location) => {
        const values = {
            userId: userId,
            groupId:groupId         
        }
        await postData(values, "/groups/userconnection/", {
            onSuccess: async (response) => {
                console.log(response.data)
                setNeedToNavigate(true)
                setNavigationLocation(location)
            },
            onError: (error) => {
              console.log(error)
              let message = ''
              if (error.response.status === 500) {
                message = t('register_form_error')
              } else {
                message = error.response.data
              }
            },
          })
    }

    const getGroups = async (values) => {
        await getData(`/groups/searchlist/${values.search}`, {
            onSuccess: async (response) => {
                console.log(response.data)
                setGroups(response.data)
            },
            onError: (error) => {
              console.log(error)
              let message = ''
              if (error.response.status === 500) {
                message = t('register_form_error')
              } else {
                message = error.response.data
              }
            },
          })
    }

  return (
    <View>
        <View style={styles.rowLayout}>
          <BackButton action={setJoinGroup}/>
          <Text style={styles.headerStyle}>{t('group_search')}</Text>
        </View>
      <Formik
          initialValues={{
          title: '',
          content: '',
          }}
          validationSchema={SearchValidationSchema}
          validateOnMount={true}
          onSubmit={(values) => {
          console.log("bah")
          getGroups(values)
          }}
      >
          {({
          handleChange,
          handleBlur,
          handleSubmit,
          errors,
          touched,
          isValid,
          }) => (
          <View>
            <FormField hideText={false} required={false} largeField={false} placeholder={t('group_name')} handleChange={() => handleChange('search')}
              handleBlur={() => handleBlur('search')} errors={errors} touched={touched}/> 
          <View style={styles.buttonStyle}>
                  <Button
                      title={t('search')}
                      onPress={handleSubmit}
                      disabled={!isValid}
                  />
                  </View>
          </View>)}
      </Formik>
      {searchResultCards}
    </View>
  )
}