import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	ImageBackground,
} from 'react-native'
import React, { useState } from 'react'
import localStyles from './formField.style'

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
		? [localStyles.input, localStyles.highInput]
		: localStyles.input
	var multiline = largeField ? true : false

	return (
		<View
			style={[
				localStyles.inputContainer,
				largeField && localStyles.highInputContainer,
			]}
		>
			{hideText && (
				<View style={localStyles.reveal}>
					<TouchableOpacity
						title="reveal"
						onPress={() => setHidden(!hidden)}
					>
						<ImageBackground
							style={localStyles.formFieldImage}
							source={source}
							resizeMode="center"
						></ImageBackground>
					</TouchableOpacity>
				</View>
			)}
			{required && <Text style={localStyles.required}>*</Text>}
			<TextInput
				style={[
					inputStyle,
					whiteText && localStyles.whiteText,
					minimalStyle && localStyles.noteInput,
					touched && errors && localStyles.inputError,
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
						localStyles.errorText,
						errorPosition && { top: errorPosition },
					]}
				>
					{errors}
				</Text>
			)}
		</View>
	)
}
