import * as Yup from 'yup'
import i18n from '../features/language_select/i18n'

module.exports = {
  LoginValidationSchema: Yup.object().shape({
    username: Yup.string()
      .min(4, i18n.t('register_username_validation_short'))
      .max(32, i18n.t('register_username_validation_long'))
      .required(i18n.t('username_validation')),
    password: Yup.string()
      .min(8, i18n.t('register_password_validation_short'))
      .max(256, i18n.t('register_password_validation_long'))
      .required(i18n.t('password_validation')),
  }),
  RegisterValidationSchema: Yup.object().shape({
    email: Yup.string()
      .email(i18n.t('register_email_validation'))
      .required(i18n.t('email_validation')),
    password: Yup.string()
      .min(8, i18n.t('register_password_validation_short'))
      .max(256, i18n.t('register_password_validation_long'))
      .required(i18n.t('password_validation')),
    username: Yup.string()
      .min(4, i18n.t('register_username_validation_short'))
      .max(32, i18n.t('register_username_validation_long'))
      .required(i18n.t('username_validation')),
    name: Yup.string(),
    school: Yup.string(),
  }),
  CreateGroupValidationSchema: Yup.object().shape({
    name: Yup.string()
    .min(4, i18n.t('name_short_validation'))
    .max(48, i18n.t('name_long_validation'))
    .required(i18n.t('name_required_validation')),
    class: Yup.string()
    .max(48, i18n.t('class_long_validation')),
    description: Yup.string()
    .max(100, i18n.t('description_long_validation')),
    password: Yup.string()
    .min(8, i18n.t('register_password_validation_short'))
    .max(256, i18n.t('register_password_validation_long'))
  }),
  CreateTopicValidationSchema: Yup.object().shape({
    topic: Yup.string()
    .max(48, i18n.t('topic_long_validation'))
    .required(i18n.t('topic_required_validation')),
    description: Yup.string()
    .max(100, i18n.t('description_long_validation')),
  }),
  NoteValidationSchema: Yup.object().shape({
    title: Yup.string()
    .max(48, i18n.t('title_long_validation')),
    content: Yup.string()
    .required(i18n.t('content_required_validation'))
  }),
  SearchValidationSchema: Yup.object().shape({
    search: Yup.string()
    .required(i18n.t('search_required_validation'))
  }),
}
