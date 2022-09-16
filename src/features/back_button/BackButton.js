import {TouchableOpacity, ImageBackground } from 'react-native'
import styles from '../../utils/styles'

export default function GroupHub({ action }) {


  var backArrow = require('../../../assets/left-arrow.png')

  return (
    <TouchableOpacity onPress={() => action(false)}>
        <ImageBackground
            source={backArrow}
            resizeMode="cover"
            style={styles.backButton}
        />
    </TouchableOpacity>
  )
}
