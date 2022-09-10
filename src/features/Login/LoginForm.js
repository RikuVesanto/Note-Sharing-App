import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native'
import React, { useState } from 'react'
import jwt_decode from 'jwt-decode';
import { Button } from '@rneui/themed'
import { Formik } from 'formik'
import { LoginValidationSchema } from '../../utils/validation-schemas'
import { postData } from '../../utils/http-requests'
import '../language-select/i18n'
import { useTranslation } from 'react-i18next'
import styles from '../../utils/styles'

export default function LoginForm({ setLoginInfo }) {
  const { t } = useTranslation()
  const [hidden, setHidden] = useState(true)
  var source = hidden
    ? require('../../../assets/eye-off-fill.png')
    : require('../../../assets/eye-fill.png')

  const sendData = async (values) => {
    var data = {
      password: values.password,
      username: values.username,
    }
    await postData(data, '/users/login', {
      onSuccess: async (response) => {
        console.log(response.status)
        var decoded = jwt_decode(response.data)
        console.log(decoded)
        if (decoded) {
          setLoginInfo(decoded)
        }
      },
      onError: (error) => {
        console.log(error)
      },
    })
  }

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      validationSchema={LoginValidationSchema}
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
            <TextInput
              style={[
                styles.input,
                touched.username && errors.username && styles.inputError,
              ]}
              placeholder={t('username')}
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
            />
            {errors.username && touched.username && (
              <Text style={styles.errorText}>{errors.username}</Text>
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
              placeholder={t('password')}
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
              title={t('login')}
              onPress={handleSubmit}
              disabled={!isValid}
            />
          </View>
        </View>
      )}
    </Formik>
  )
}
