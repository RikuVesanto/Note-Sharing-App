import React from 'react'
import { View, Text } from 'react-native'
import { Button } from '@rneui/themed'
import { Formik } from 'formik'
import { CreateGroupValidationSchema } from '../../../../utils/validation-schemas'
import '../../../../utils/i18n'
import { useTranslation } from 'react-i18next'
import styles from '../../../../utils/styles'
import FormField from '../../../general_components/FormField'
import BackButton from '../../../general_components/BackButton'

export default function CreateGroupForm({ setCreateGroup, action }) {
	const { t } = useTranslation()

	return (
		<View>
			<View style={styles.rowLayout}>
				<BackButton action={setCreateGroup} />
				<Text style={[styles.mediumHeader, styles.marginLeftBottom]}>
					{t('create_group')}
				</Text>
			</View>
			<Formik
				initialValues={{
					name: '',
					description: '',
					password: '',
				}}
				validationSchema={CreateGroupValidationSchema}
				validateOnMount={true}
				onSubmit={(values) => {
					action(values)
				}}
			>
				{({
					handleChange,
					handleBlur,
					handleSubmit,
					errors,
					touched,
					isValid,
					values,
				}) => (
					<View>
						<FormField
							hideText={false}
							required={true}
							largeField={false}
							placeholder={t('group_name')}
							handleChange={() => handleChange('name')}
							handleBlur={handleBlur('name')}
							errors={errors.name}
							touched={touched.name}
							value={values.name}
						/>
						<FormField
							hideText={false}
							required={false}
							largeField={true}
							placeholder={t('description')}
							handleChange={() => handleChange('description')}
							handleBlur={handleBlur('description')}
							errors={errors.description}
							touched={touched.description}
							value={values.description}
						/>
						<FormField
							hideText={true}
							required={false}
							largeField={false}
							placeholder={t('password')}
							handleChange={() => handleChange('password')}
							handleBlur={handleBlur('password')}
							errors={errors.password}
							touched={touched.password}
							value={values.password}
						/>

						<Button
							buttonStyle={styles.button}
							title={t('create_group')}
							onPress={handleSubmit}
							disabled={!isValid}
						/>
					</View>
				)}
			</Formik>
		</View>
	)
}
