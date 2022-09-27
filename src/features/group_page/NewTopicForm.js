import {View,Text, Alert, Modal} from 'react-native'
import '../language_select/i18n'
import { useTranslation } from 'react-i18next'
import styles from '../../utils/styles'
import { Button } from '@rneui/themed'
import { Formik } from 'formik'
import { CreateTopicValidationSchema } from '../../utils/validation-schemas'
import { postData } from '../../utils/http-requests'
import i18n from '../language_select/i18n'
import BackButton from '../general_components/BackButton'
import FormField from '../general_components/FormField'
import addToUseState from '../../utils/general-functions'

export default function NewTopicForm({newTopicFormVisible, setNewTopicFormVisible, groupId, topics, setTopics}) {
  const { t } = useTranslation()

  const sendData = async (values) => {
    var data = {
      topic: values.topic,
      groupId: groupId
    }
    if (values.description != '') data.description = values.description
    await postData(data, '/topics/register', {
      onSuccess: async (response) => {
        console.log(response)
        addToUseState(data,topics, setTopics)
        setNewTopicFormVisible(false)
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
    <Modal
    animationType="slide"
    visible={newTopicFormVisible}
    onBackButtonPress={() => setNewTopicFormVisible(false)}
    onRequestClose={() => {
      Alert.alert("Modal has been closed.")
      setNewTopicFormVisible(false)
    }}
  >
    <BackButton action={setNewTopicFormVisible}/>
    <Text style={styles.formTitle}>{t('new_topic')}</Text>
    <Formik
        initialValues={{
          topic: '',
          description: '',
        }}
        validationSchema={CreateTopicValidationSchema}
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
            <FormField hideText={false} required={true} largeField={false} placeholder={t('topic')} handleChange={() => handleChange('topic')}
              handleBlur={() => handleBlur('topic')} errors={errors} touched={touched}/>
            <FormField hideText={false} required={false} largeField={true} placeholder={t('description')} handleChange={() => handleChange('description')}
              handleBlur={() => handleBlur('description')} errors={errors} touched={touched}/>  
            <View style={styles.buttonStyle}>
              <Button
                title={i18n.t('create_topic')}
                onPress={handleSubmit}
                disabled={!isValid}
              />
            </View>
          </View>
        )}
      </Formik>
  </Modal>
  )
}
