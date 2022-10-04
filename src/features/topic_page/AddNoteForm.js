import {View} from 'react-native'
import styles from '../../utils/styles'
import { Button } from '@rneui/themed'
import { Formik } from 'formik'
import { NoteValidationSchema } from '../../utils/validation-schemas'
import { postData } from '../../utils/http-requests'
import {showStatusMessage} from '../../utils/general-functions'
import { useTranslation } from 'react-i18next'
import '../language_select/i18n'
import FormField from '../general_components/FormField'

export default function AddNoteForm({id,setAddNote,refreshNotes, setRefreshNotes}) {
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
            setAddNote(false)
        },
        onError: (error) => {
            showStatusMessage(error.data.message, "failure")
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
            errors,
            touched,
            isValid,
            }) => (
            <View>
                <FormField hideText={false} required={false} largeField={false} placeholder={t('title')} handleChange={() => handleChange('title')}
                    handleBlur={handleBlur('title')} errors={errors.title} touched={touched.title}/>
                <FormField hideText={false} required={true} largeField={true} placeholder={t('content')} handleChange={() => handleChange('content')}
                    handleBlur={handleBlur('content')} errors={errors.content} touched={touched.content}/>    
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