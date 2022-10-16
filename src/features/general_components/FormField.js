import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	ImageBackground,
} from 'react-native'
import React, { useState } from 'react'
import styles from '../../utils/styles'

export default function FormField({
	hideText,
	required,
	largeField,
	placeholder,
	handleChange,
	handleBlur,
	errors,
	touched,
	value = '',
	minimalStyle = false,
	errorPosition = null,
	whiteText = false,
}) {
	const [hidden, setHidden] = useState(hideText)

	var source = hidden
		? require('../../../assets/eye-off-fill.png')
		: require('../../../assets/eye-fill.png')

	var inputStyle = largeField
		? [styles.input, styles.highInput]
		: styles.input
	var multiline = largeField ? true : false

	return (
		<View
			style={[
				styles.inputContainer,
				largeField && styles.highInputContainer,
			]}
		>
			{hideText && (
				<View style={styles.reveal}>
					<TouchableOpacity
						title="reveal"
						onPress={() => setHidden(!hidden)}
					>
						<ImageBackground
							style={styles.formFieldImage}
							source={source}
							resizeMode="center"
						></ImageBackground>
					</TouchableOpacity>
				</View>
			)}
			{required && <Text style={styles.required}>*</Text>}
			<TextInput
				style={[
					inputStyle,
					whiteText && styles.whiteText,
					minimalStyle && styles.noteInput,
					touched && errors && styles.inputError,
				]}
				multiline={multiline}
				placeholder={placeholder}
				onChangeText={handleChange()}
				secureTextEntry={hidden}
				onBlur={handleBlur}
				value={value}
			/>
			{errors && touched && (
				<Text
					style={[
						styles.errorText,
						errorPosition && { top: errorPosition },
					]}
				>
					{errors}
				</Text>
			)}
		</View>
	)
}
