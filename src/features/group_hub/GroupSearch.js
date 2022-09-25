import React, { useState, useEffect } from 'react'
import {View, Text} from 'react-native'
import styles from '../../utils/styles'
import { Button } from '@rneui/themed'
import { Formik } from 'formik'
import { SearchValidationSchema } from '../../utils/validation-schemas'
import { useTranslation } from 'react-i18next'
import i18n from '../language_select/i18n'
import { getData, postData } from '../../utils/http-requests'
import SearchResultCard from './SearchResultCard'
import FormField from '../general_components/FormField'

export default function GroupSearch({userId}) {
    const [groups, setGroups] = useState("")
    const [searchResultCards, setSearchResultCards] = useState([])

    useEffect(() => {
      if (groups != "") {
        console.log("bah")
        createSearchResultCards()
      }
    } , [groups])

    const createSearchResultCards = () => {
        let screens = []
        let results = 0
        for (var group of groups) {
          screens.push(<SearchResultCard key={group.id} name={group.name} description={group.description} action={joinGroup} groupId={group.id}/>)
          results++
        }
        screens.unshift(<Text style={styles.noResultsText}>{results + " " + i18n.t('results_found')}</Text>)
        setSearchResultCards(screens)
    }

    const { t } = useTranslation()

    const joinGroup = async (groupId) => {
        const values = {
            userId: userId,
            groupId:groupId         
        }
        await postData(values, "/groups/adduserconnection/", {
            onSuccess: async (response) => {
                console.log(response.data)
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
                message = i18n.t('register_form_error')
              } else {
                message = error.response.data
              }
            },
          })
    }

  return (
    <View>
    <Formik
        initialValues={{
        title: '',
        content: '',
        }}
        validationSchema={SearchValidationSchema}
        validateOnMount={true}
        onSubmit={(values) => {
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