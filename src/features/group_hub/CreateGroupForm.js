import React, { useState, useEffect } from 'react'
import {View, Text} from 'react-native'
import { Button } from '@rneui/themed'
import { Formik } from 'formik'
import { CreateGroupValidationSchema } from '../../utils/validation-schemas'
import { postData } from '../../utils/http-requests'
import '../language_select/i18n'
import { useTranslation } from 'react-i18next'
import styles from '../../utils/styles'
import FormField from '../general_components/FormField'
import BackButton from '../general_components/BackButton'
import { useNavigation } from '@react-navigation/native';

  export default function RegisterForm({loginInfo, setCreateGroup, setNeedToNavigate, readyToNavigate, setReadyToNavigate, refreshGroups, setRefreshGroups}) {
    const navigation = useNavigation();
    const { t } = useTranslation()

    const [navigationLocation, setNavigationLocation] = useState("")

    useEffect(() => {
      if (readyToNavigate) {
        setReadyToNavigate(false)
        setNeedToNavigate(false)
        navigation.navigate(navigationLocation)
        setCreateGroup(false)
      }
    },[readyToNavigate])

    const sendData = async (values) => {
      var data = {
        name: values.name,
        creatorId:loginInfo.id
      }
      if (values.password != '') data.password = values.password
      if (values.class != '') data.class = values.class
      if (values.description != '') data.description = values.description
      await postData(data, '/groups/group', {
        onSuccess: async (response) => {
          //console.log(response.data)
          setRefreshGroups(!refreshGroups)
          setNeedToNavigate(true)
          setNavigationLocation(data.name)
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
          <BackButton action={setCreateGroup}/>
          <Text style={styles.headerStyle}>{t('create_group')}</Text>
        </View>
        <Formik
          initialValues={{
            name: '',
            class:'',
            description: '',
            password: '',
          }}
          validationSchema={CreateGroupValidationSchema}
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
              <FormField hideText={false} required={true} largeField={false} placeholder={t('group_name')} handleChange={() => handleChange('name')}
                handleBlur={handleBlur('name')} errors={errors.name} touched={touched.name}/> 
              <FormField hideText={false} required={false} largeField={false} placeholder={t('class')} handleChange={() => handleChange('class')}
                handleBlur={handleBlur('class')} errors={errors.class} touched={touched.class}/> 
              <FormField hideText={false} required={false} largeField={true} placeholder={t('description')} handleChange={() => handleChange('description')}
                handleBlur={handleBlur('description')} errors={errors.description} touched={touched.description}/>
              <FormField hideText={true} required={false} largeField={false} placeholder={t('password')} handleChange={() => handleChange('password')}
                handleBlur={handleBlur('password')} errors={errors.password} touched={touched.password}/>  
              <View style={styles.buttonStyle}>
                <Button
                  title={t('create_group')}
                  onPress={handleSubmit}
                  disabled={!isValid}
                />
              </View>
            </View>
          )}
        </Formik>
      </View>
    )
  }
  