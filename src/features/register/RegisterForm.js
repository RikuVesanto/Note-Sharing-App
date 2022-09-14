import {
  View,
  Text,
  TextInput,
  Keyboard,
  TouchableOpacity,
  ImageBackground,
} from 'react-native'
import React, { useState } from 'react'
import { Button } from '@rneui/themed'
import { Formik } from 'formik'
import { RegisterValidationSchema } from '../../utils/validation-schemas'
import { postData } from '../../utils/http-requests'
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'
import i18n from '../language_select/i18n'
import styles from '../../utils/styles'

export default function RegisterForm() {
  const [hidden, setHidden] = useState(true)
  var source = hidden
    ? require('../../../assets/eye-off-fill.png')
    : require('../../../assets/eye-fill.png')

  const [stateBirthday, setStateBirthday] = useState(null)
  const [showDatePicker, setShowDatePicker] = useState(false)

  // Updates birthday value to state and hides the date picker
  const onBirthdayChange = (selectedDate) => {
    if (selectedDate.type !== 'dismissed') {
      setStateBirthday(new Date(selectedDate.nativeEvent.timestamp))
    }
    setShowDatePicker(false)
    Keyboard.dismiss()
  }

  const sendData = async (values) => {
    var data = {
      email: values.email,
      password: values.password,
      username: values.username,
    }
    if (values.name != '') data.name = values.name
    if (values.school != '') data.school = values.school
    if (stateBirthday) data.birthday = stateBirthday.toISOString()
    await postData(data, '/users/register', {
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
    <Formik
      initialValues={{
        email: '',
        username: '',
        password: '',
        name: '',
        school: '',
      }}
      validationSchema={RegisterValidationSchema}
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
                touched.email && errors.email && styles.inputError,
              ]}
              placeholder={i18n.t('email')}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {errors.email && touched.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.required}>*</Text>
            <TextInput
              style={[
                styles.input,
                touched.username && errors.username && styles.inputError,
              ]}
              placeholder={i18n.t('username')}
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
            />
            {errors.username && touched.username && (
              <Text style={styles.errorText}>{errors.username}</Text>
            )}
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.required}>*</Text>
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
          <View style={styles.inputContainer}>
            <TextInput
              style={[
                styles.input,
                touched.name && errors.name && styles.inputError,
              ]}
              placeholder={i18n.t('name')}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
            />
            {errors.name && touched.name && (
              <Text style={styles.errorText}>{errors.name}</Text>
            )}
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.reveal}>
              <TouchableOpacity
                title="clear"
                onPress={() => setStateBirthday(null)}
              >
                <ImageBackground
                  style={styles.formFieldImage}
                  source={require('../../../assets/delete_icon.png')}
                  resizeMode="center"
                ></ImageBackground>
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.input}
              placeholder={i18n.t('birthday')}
              value={
                stateBirthday ? moment(stateBirthday).format('DD.MM.Y') : ''
              }
              onTouchEnd={() => setShowDatePicker(true)} // Opens date picker when clicked (touched)
            />
            {showDatePicker && (
              <DateTimePicker
                value={stateBirthday ? stateBirthday : new Date()}
                mode="date"
                onChange={onBirthdayChange}
              />
            )}
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={[
                styles.input,
                touched.school && errors.school && styles.inputError,
              ]}
              placeholder={i18n.t('school')}
              onChangeText={handleChange('school')}
              onBlur={handleBlur('school')}
              value={values.school}
            />
            {errors.school && touched.school && (
              <Text style={styles.errorText}>{errors.school}</Text>
            )}
          </View>
          <View style={styles.buttonStyle}>
            <Button
              title={i18n.t('register')}
              onPress={handleSubmit}
              disabled={!isValid}
            />
          </View>
        </View>
      )}
    </Formik>
  )
}
