import {Text, View,TextInput} from 'react-native'
import styles from '../../utils/styles'
import { Button } from '@rneui/themed'
import { Formik } from 'formik'
import { NoteValidationSchema } from '../../utils/validation-schemas'
import { postData } from '../../utils/http-requests'
import { useTranslation } from 'react-i18next'
import i18n from '../language_select/i18n'

export default function AddNoteForm({id}) {

    const { t } = useTranslation()

    const sendData = async (values) => {
        console.log(id)
        var data = {
        title: values.title,
        content: values.content,
        topicId: id
        }
        await postData(data, '/notes/add/', {
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
            title: '',
            content: '',
            }}
            validationSchema={NoteValidationSchema}
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
                    touched.title && errors.title && styles.inputError,
                    ]}
                    placeholder={i18n.t('title')}
                    onChangeText={handleChange('title')}
                    onBlur={handleBlur('title')}
                    value={values.title}
                />
                {errors.title && touched.title && (
                    <Text style={styles.errorText}>{errors.title}</Text>
                )}
                </View>
                <View style={styles.highInputContainer}>
                <TextInput
                    style={[
                    styles.highInput,
                    touched.content && errors.content && styles.inputError,
                    ]}
                    placeholder={t('content')}
                    onChangeText={handleChange('content')}
                    onBlur={handleBlur('content')}
                    value={values.content}
                    multiline={true}
                />
                {errors.content && touched.content && (
                    <Text style={styles.errorText}>{errors.content}</Text>
                )}
                </View>
                <View style={styles.buttonStyle}>
                <Button
                    title={t('create_note')}
                    onPress={handleSubmit}
                    disabled={!isValid}
                />
                </View>
            </View>
            )}
        </Formik>
    )
}