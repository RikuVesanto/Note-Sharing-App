import { View } from 'react-native'
import styles from '../../../../utils/styles'
import { Button } from '@rneui/themed'
import { Formik } from 'formik'
import { CreateGroupValidationSchema } from '../../../../utils/validation-schemas'
import { useTranslation } from 'react-i18next'
import '../../../../utils/i18n'
import {
	checkForFalse,
	CheckForShallowObjectEquality,
} from '../../../../functions/general-functions'
import React from 'react'
import FormField from '../../../general-components/FormField'
import CloseButton from '../../../general-components/CloseButton'

export default function EditGroupInfoForm({
	name,
	description,
	setEditGroupInfo,
	action,
}) {
	const { t } = useTranslation()

	const initialValues = { name: name, description: description }

	return (
		<View style={styles.headerForm}>
			<CloseButton action={() => setEditGroupInfo(false)} />

			<Formik
				initialValues={initialValues}
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
							required={false}
							largeField={false}
							placeholder={t('name')}
							handleChange={() => handleChange('name')}
							handleBlur={handleBlur('name')}
							errors={errors.name}
							touched={touched.name}
							value={values.name}
							minimalStyle={true}
							errorPosition={45}
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
							minimalStyle={true}
							errorPosition={85}
						/>
						<Button
							buttonStyle={[
								styles.button,
								styles.marginBottom,
								styles.largeMarginTop,
							]}
							title={t('edit_group_name')}
							onPress={handleSubmit}
							disabled={checkForFalse(
								!isValid,
								CheckForShallowObjectEquality(values, initialValues)
							)}
						/>
					</View>
				)}
			</Formik>
		</View>
	)
}
