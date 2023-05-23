import { 
    StyleSheet, 
    Text, 
    View,
    TouchableOpacity,
    Image, 
    SafeAreaView,
    Pressable,
    Modal,
  } from 'react-native';

export default function HelpInfoScreen({navigation}) {

  const handleGoBack = () => {
    navigation.navigate('UserPage')
  }
  return (
    <SafeAreaView>
      <View style={styles.container}>
          <Text onPress={() => handleGoBack()}>Help Infos</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
  },
})