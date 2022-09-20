import {
  View,
} from 'react-native'

import jwt_decode from 'jwt-decode';
import { Button } from '@rneui/themed'
import { Formik } from 'formik'
import { LoginValidationSchema } from '../../utils/validation-schemas'
import { postData } from '../../utils/http-requests'
import '../language_select/i18n'
import { useTranslation } from 'react-i18next'
import styles from '../../utils/styles'
import FormField from '../general_components/FormField'

export default function LoginForm({ setLoginInfo }) {
  const { t } = useTranslation()

  const sendData = async (values) => {
    var data = {
      password: values.password,
      username: values.username,
    }
    await postData(data, '/users/login', {
      onSuccess: async (response) => {
        var decoded = jwt_decode(response.data)
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
          <FormField hideText={false} required={false} largeField={false} placeholder={t('username')} handleChange={() => handleChange('username')}
            handleBlur={() => handleBlur('username')} errors={errors} touched={touched}/>
          <FormField hideText={true} required={false} largeField={false} placeholder={t('password')} handleChange={() => handleChange('password')}
            handleBlur={() => handleBlur('password')} errors={errors} touched={touched}/>
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
