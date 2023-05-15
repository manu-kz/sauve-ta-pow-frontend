
import { StyleSheet, Text, View } from 'react-native';

export default function UserScreen({ navigation }) {
 return (
   <View style={styles.container}>
          <Text style={styles.title}>User</Text>

   </View>
 );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'blue',
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
        resizeMode: 'contain',
        width:'100%'
    }
   });