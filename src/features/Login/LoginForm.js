import {View} from 'react-native'
import jwt_decode from 'jwt-decode';
import { Button } from '@rneui/themed'
import { Formik } from 'formik'
import { LoginValidationSchema } from '../../utils/validation-schemas'
import { getData } from '../../utils/http-requests'
import '../language_select/i18n'
import { useTranslation } from 'react-i18next'
import styles from '../../utils/styles'
import FormField from '../general_components/FormField'

export default function LoginForm({ setLoginInfo }) {
  const { t } = useTranslation()

  const sendData = async (values) => {
    await getData(`/users/user/${values.username}/${values.password}`, {
      onSuccess: async (response) => {
        console.log(response.status)
        var decoded = jwt_decode(response.data)
        if (decoded) {
          setLoginInfo(decoded)
        }
      },
      onError: (error) => {
        console.log(error.status, error.data.message)
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
        errors,
        touched,
        isValid,
      }) => (
        <View>
          <FormField hideText={false} required={false} largeField={false} placeholder={t('username')} handleChange={() => handleChange('username')}
            handleBlur={handleBlur('username')} errors={errors.username} touched={touched.username}/>
          <FormField hideText={true} required={false} largeField={false} placeholder={t('password')} handleChange={() => handleChange('password')}
            handleBlur={handleBlur('password')} errors={errors.password} touched={touched.password}/>
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
