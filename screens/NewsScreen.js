
import { StyleSheet, Text, View } from 'react-native';

export default function NewsScreen({ navigation }) {
 return (
   <View style={styles.container}>
          <Text style={styles.title}>News</Text>

   </View>
 );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'yellow',
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
        resizeMode: 'contain',
        width:'100%'
    }
   });