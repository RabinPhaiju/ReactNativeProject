import React from 'react'
import { Text, View,} from 'react-native';
import GlobalStyle from './utils/GlobalStyle'

const AboutPage = () => {
  return (
    <View>
    <Text style={[{color:'black'},GlobalStyle.CustomStyle]}>AboutPage</Text>
    </View>
  )
}

export default AboutPage