import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ImageBackground,
  } from 'react-native'
  import React, { useState } from 'react'
  import { Button } from '@rneui/themed'
  import { Formik } from 'formik'
  import { CreateGroupValidationSchema } from '../../utils/validation-schemas'
  import { postData } from '../../utils/http-requests'
  import i18n from '../language_select/i18n'
  import styles from '../../utils/styles'
  
  export default function RegisterForm({loginInfo}) {
    const [hidden, setHidden] = useState(true)
    var source = hidden
      ? require('../../../assets/eye-off-fill.png')
      : require('../../../assets/eye-fill.png')
  
    const sendData = async (values) => {
      console.log(loginInfo)
      var data = {
        name: values.name,
        password: values.password,
        creatorId:loginInfo.id
      }
      if (values.class != '') data.class = values.class
      if (values.description != '') data.description = values.description
      await postData(data, '/groups/register', {
        onSuccess: async (response) => {
          console.log(response)
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
              <View style={styles.inputContainer}>
                <Text style={styles.required}>*</Text>
                <TextInput
                  style={[
                    styles.input,
                    touched.name && errors.name && styles.inputError,
                  ]}
                  placeholder={i18n.t('group_name')}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                />
                {errors.name && touched.name && (
                  <Text style={styles.errorText}>{errors.name}</Text>
                )}
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={[
                    styles.input,
                    touched.class && errors.class && styles.inputError,
                  ]}
                  placeholder={i18n.t('class')}
                  onChangeText={handleChange('class')}
                  onBlur={handleBlur('class')}
                  value={values.class}
                />
                {errors.class && touched.class && (
                  <Text style={styles.errorText}>{errors.class}</Text>
                )}
              </View>
              <View style={styles.highInputContainer}>
                <TextInput
                  style={[
                    styles.highInput,
                    touched.description && errors.description && styles.inputError,
                  ]}
                  placeholder={i18n.t('description')}
                  onChangeText={handleChange('description')}
                  onBlur={handleBlur('description')}
                  value={values.description}
                  multiline={true}
                />
                {errors.description && touched.description && (
                  <Text style={styles.errorText}>{errors.description}</Text>
                )}
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.reveal}>
                  <TouchableOpacity
                    title="reveal"
                    onPress={() => setHidden(!hidden)}
                  >
                    <ImageBackground
                      style={styles.formFieldImage}
                      source={source}
                      resizeMode="center"
                    ></ImageBackground>
                  </TouchableOpacity>
                </View>
                <TextInput
                  style={[
                    styles.input,
                    touched.password && errors.password && styles.inputError,
                  ]}
                  placeholder={i18n.t('password')}
                  onChangeText={handleChange('password')}
                  secureTextEntry={hidden}
                  onBlur={handleBlur('password')}
                />
                {errors.password && touched.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
              </View>
              <View style={styles.buttonStyle}>
                <Button
                  title={i18n.t('create_group')}
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
  