import {View} from 'react-native'
import styles from '../../utils/styles'
import { Button } from '@rneui/themed'
import { Formik } from 'formik'
import { NoteValidationSchema } from '../../utils/validation-schemas'
import { postData } from '../../utils/http-requests'
import { useTranslation } from 'react-i18next'
import i18n from '../language_select/i18n'
import FormField from '../general_components/FormField'
import addToUseState from '../../utils/general-functions'

export default function AddNoteForm({id, notes, setNotes, setAddNote}) {
    

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
            addToUseState(data,notes, setNotes)
            setAddNote(false)
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
                <FormField hideText={false} required={false} largeField={false} placeholder={t('title')} handleChange={() => handleChange('title')}
                    handleBlur={() => handleBlur('title')} errors={errors} touched={touched}/>
                <FormField hideText={false} required={true} largeField={true} placeholder={t('content')} handleChange={() => handleChange('content')}
                    handleBlur={() => handleBlur('content')} errors={errors} touched={touched}/>    
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