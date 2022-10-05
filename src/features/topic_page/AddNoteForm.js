import {View,Text,TextInput} from 'react-native'
import styles from '../../utils/styles'
import { Button } from '@rneui/themed'
import { Formik } from 'formik'
import { NoteValidationSchema } from '../../utils/validation-schemas'
import { postData } from '../../utils/http-requests'
import {showStatusMessage} from '../../utils/general-functions'
import { useTranslation } from 'react-i18next'
import '../language_select/i18n'

export default function AddNoteForm({id,refreshNotes, setRefreshNotes}) {
    const { t } = useTranslation()

    const sendData = async (values) => {
        var data = {
        content: values.content,
        topicId: id
        }
        if (values.title != '') data.title = values.title
        await postData(data, '/notes/note/', {
        onSuccess: async (response) => {
            showStatusMessage(response.data, "success")
            setRefreshNotes(!refreshNotes)
        },
        onError: (error) => {
            showStatusMessage(error.data.message, "failure")
        },
        })
    }
    const emptyValues = {title: '',content: ''}
    return (
        <View style={styles.noteCard}>
            <Formik
                initialValues={emptyValues}
                validationSchema={NoteValidationSchema}
                validateOnMount={true}
                onSubmit={(values, actions) => {
                sendData(values)
                actions.setValues(emptyValues)
                }}
            >
                {({
                handleChange,
                handleBlur,
                handleSubmit,
                errors,
                touched,
                isValid,
                values
                }) => (
                <View>
                   <View style={styles.noteContainer}>
                        <TextInput
                            style={[
                                styles.noteInput,
                                touched.title && errors && styles.inputError,
                            ]}
                            placeholder={t('title')}
                            onChangeText={handleChange('title')}
                            onBlur={handleBlur('title')}
                            value={values.title}
                        />
                        {errors && touched.title && (
                        <Text style={[styles.errorText,styles.titleErrorText]}>{errors.title}</Text>
                        )}
                   </View>
                   <View style={styles.noteContainer}>
                        <TextInput
                            style={[
                                styles.noteInput,styles.highNoteInput,
                                touched.content && errors && styles.inputError,
                            ]}
                            multiline={true}
                            placeholder={t('content')}
                            onChangeText={handleChange('content')}
                            onBlur={handleBlur('content')}
                            value={values.content}
                        />
                        {errors && touched.content && (
                        <Text style={[styles.errorText,styles.contentErrorText]}>{errors.content}</Text>
                        )}
                   </View>
                    <View style={styles.noteSubmitButton}>
                    <Button
                        title={t('create_note')}
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