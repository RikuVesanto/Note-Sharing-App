import {View, Text, TextInput, TouchableOpacity, ImageBackground,} from 'react-native'
import React, { useState } from 'react'
import styles from '../../utils/styles'

export default function FormField({hideText, required, largeField, placeholder, handleChange, handleBlur, errors, touched}) {
    const [hidden, setHidden] = useState(hideText)

    var source = hidden
    ? require('../../../assets/eye-off-fill.png')
    : require('../../../assets/eye-fill.png')

  var viewStyle = largeField ? styles.highInputContainer : styles.inputContainer
  var inputStyle = largeField ? styles.highInput : styles.input
  var multiline = largeField ? true : false
  return (
        <View style={viewStyle}>
            {hideText && 
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
            </View>}
            {required &&<Text style={styles.required}>*</Text>}
            <TextInput
              style={[
                inputStyle,
                touched.password && errors.password && styles.inputError,
              ]}
              multiline={multiline}
              placeholder={placeholder}
              onChangeText={handleChange()}
              secureTextEntry={hidden}
              onBlur={handleBlur}
            />
            {errors.password && touched.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
        </View>
  )
}