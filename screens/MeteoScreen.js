
import { StyleSheet, Text, View } from 'react-native';

export default function MeteoScreen({ navigation }) {
 return (
   <View style={styles.container}>
          <Text style={styles.title}>Meteo</Text>

   </View>
 );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#99C24D',
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
        resizeMode: 'contain',
        width:'100%'
    }
   });