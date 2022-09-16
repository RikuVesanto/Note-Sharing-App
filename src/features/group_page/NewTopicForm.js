import {View,Text,TextInput, Alert, Modal} from 'react-native'
import '../language_select/i18n'
import { useTranslation } from 'react-i18next'
import styles from '../../utils/styles'
import { Button } from '@rneui/themed'
import { Formik } from 'formik'
import { CreateTopicValidationSchema } from '../../utils/validation-schemas'
import { postData } from '../../utils/http-requests'
import i18n from '../language_select/i18n'
import BackButton from '../back_button/BackButton'

export default function NewTopicForm({newTopicFormVisible, setNewTopicFormVisible, groupId}) {
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
            <View style={styles.inputContainer}>
              <Text style={styles.required}>*</Text>
              <TextInput
                style={[
                  styles.input,
                  touched.topic && errors.topic && styles.inputError,
                ]}
                placeholder={i18n.t('topic')}
                onChangeText={handleChange('topic')}
                onBlur={handleBlur('topic')}
                value={values.topic}
              />
              {errors.topic && touched.topic && (
                <Text style={styles.errorText}>{errors.topic}</Text>
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
