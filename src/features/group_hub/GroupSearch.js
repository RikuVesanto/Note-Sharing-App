import React, { useState, useEffect } from 'react'
import {Text, View, TextInput} from 'react-native'
import styles from '../../utils/styles'
import { Button } from '@rneui/themed'
import { Formik } from 'formik'
import { SearchValidationSchema } from '../../utils/validation-schemas'
import { useTranslation } from 'react-i18next'
import i18n from '../language_select/i18n'
import { getData, postData } from '../../utils/http-requests'
import SearchResultCard from './SearchResultCard'

export default function GroupSearch({userId}) {
    const [groups, setGroups] = useState("")
    const [searchResultCards, setSearchResultCards] = useState([])

    useEffect(() => {
        createSearchResultCards()
    } , [groups])

    const createSearchResultCards = () => {
        let screens = []
        for (var group of groups) {
          screens.push(<SearchResultCard key={group.id} name={group.name} description={group.description} action={joinGroup} groupId={group.id}/>)
        }
        setSearchResultCards(screens)
    }

    const { t } = useTranslation()

    const joinGroup = async (groupId) => {
        const values = {
            userId: userId,
            groupId:groupId         
        }
        console.log(values)
        await postData(values, "/groups/adduserconnection/", {
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

    const sendData = async (values) => {
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
        sendData(values)
        }}
    >
        {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        isValid,
        }) => (
        <View>
        <View style={styles.inputContainer}>
            <Text style={styles.required}>*</Text>
            <TextInput
                style={[
                styles.input,
                touched.search && errors.search && styles.inputError,
                ]}
                placeholder={i18n.t('group_name')}
                onChangeText={handleChange('search')}
                onBlur={handleBlur('search')}
                value={values.search}
            />
            {errors.search && touched.search && (
                <Text style={styles.errorText}>{errors.search}</Text>
            )}
        </View>
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