import {
    View,
  } from 'react-native'
  import { Button } from '@rneui/themed'
  import { Formik } from 'formik'
  import { CreateGroupValidationSchema } from '../../utils/validation-schemas'
  import { postData } from '../../utils/http-requests'
  import i18n from '../language_select/i18n'
  import { useTranslation } from 'react-i18next'
  import styles from '../../utils/styles'
  import FormField from '../general_components/FormField'
  
  export default function RegisterForm({loginInfo}) {
    const { t } = useTranslation()
    const sendData = async (values) => {
      var data = {
        name: values.name,
        creatorId:loginInfo.id
      }
      if (values.password != '') data.password = values.password
      if (values.class != '') data.class = values.class
      if (values.description != '') data.description = values.description
      console.log(data)
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
              <FormField hideText={false} required={true} largeField={false} placeholder={t('group_name')} handleChange={() => handleChange('name')}
                handleBlur={() => handleBlur('name')} errors={errors} touched={touched}/> 
              <FormField hideText={false} required={false} largeField={false} placeholder={t('class')} handleChange={() => handleChange('class')}
                handleBlur={() => handleBlur('class')} errors={errors} touched={touched}/> 
              <FormField hideText={false} required={false} largeField={true} placeholder={t('description')} handleChange={() => handleChange('description')}
                handleBlur={() => handleBlur('description')} errors={errors} touched={touched}/>
              <FormField hideText={true} required={false} largeField={false} placeholder={t('password')} handleChange={() => handleChange('password')}
                handleBlur={() => handleBlur('password')} errors={errors} touched={touched}/>  
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
  