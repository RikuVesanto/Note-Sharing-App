import {View,Text, Modal} from 'react-native'
import '../language_select/i18n'
import { useTranslation } from 'react-i18next'
import styles from '../../utils/styles'
import { Button } from '@rneui/themed'
import { Formik } from 'formik'
import { CreateTopicValidationSchema } from '../../utils/validation-schemas'
import { postData } from '../../utils/http-requests'
import BackButton from '../general_components/BackButton'
import FormField from '../general_components/FormField'

export default function NewTopicForm({newTopicFormVisible, setNewTopicFormVisible, groupId, refreshTopics, setRefreshTopics}) {
  const { t } = useTranslation()

  const sendData = async (values) => {
    var data = {
      topic: values.topic,
      groupId: groupId
    }
    if (values.description != '') data.description = values.description
    await postData(data, '/topics/topic', {
      onSuccess: async (response) => {
        console.log(response)
        setRefreshTopics(!refreshTopics)
        setNewTopicFormVisible(false)
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
    <Modal
    animationType="fade"
    visible={newTopicFormVisible}
    onBackButtonPress={() => setNewTopicFormVisible(false)}
    onRequestClose={() => {
      setNewTopicFormVisible(false)
    }}
    transparent={true}
    hasBackdrop={false}
  >
    <View style={styles.modal}>
    <View style={styles.rowLayout}>
      <BackButton action={setNewTopicFormVisible}/>
      <Text style={styles.formTitle}>{t('new_topic')}</Text>
    </View>
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
                title={t('create_topic')}
                onPress={handleSubmit}
                disabled={!isValid}
              />
            </View>
          </View>
        )}
      </Formik>
      </View>
  </Modal>
  )
}
