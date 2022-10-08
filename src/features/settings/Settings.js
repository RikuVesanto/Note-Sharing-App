import '../language_select/i18n'
import { useTranslation } from 'react-i18next'
import {
	Text,
	TouchableOpacity,
	ScrollView,
	ImageBackground,
} from 'react-native'
import styles from '../../utils/styles'
import AppStorage from '../../utils/secure-store'

export default function Settings({ setLogin }) {
	const { t } = useTranslation()

	return (
		<ScrollView contentContainerStyle={styles.registerContainer}>
			<Text style={styles.headerStyle}>{t('settings')}</Text>
			<TouchableOpacity
				onPress={() => {
					AppStorage.save('loginInfo', '')
					setLogin(false)
				}}
			>
				<ImageBackground
					style={styles.leftLanguageButton}
					source={require('../../../assets/logout.png')}
					resizeMode="center"
				></ImageBackground>
			</TouchableOpacity>
		</ScrollView>
	)
}
