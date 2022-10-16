import { TouchableOpacity, Text, View, ImageBackground } from 'react-native'
import i18n from './i18n'
import i18next from 'i18next'
import AppStorage from '../../utils/secure-store'
import styles from '../../utils/styles'

export default function ChangeLanguage() {
	const changeLanguage = async (value) => {
		i18next
			.changeLanguage(value)
			.then(() => AppStorage.save('language', value))
			.catch((err) => console.log(err))
	}

	return (
		<View>
			<Text
				style={[
					styles.smallHeader,
					styles.centerText,
					styles.marginTop,
				]}
			>
				{i18n.t('language')}
			</Text>
			<View style={styles.languageButtonContainer}>
				<TouchableOpacity
					title="FI"
					onPress={() => changeLanguage('fi')}
				>
					<ImageBackground
						style={styles.leftLanguageButton}
						source={require('../../../assets/finnish_flag.png')}
						resizeMode="center"
					></ImageBackground>
				</TouchableOpacity>

				<TouchableOpacity
					title="EN"
					onPress={() => changeLanguage('en')}
				>
					<ImageBackground
						style={styles.rightLanguageButton}
						source={require('../../../assets/english_flag.png')}
						resizeMode="center"
					></ImageBackground>
				</TouchableOpacity>
			</View>
		</View>
	)
}
