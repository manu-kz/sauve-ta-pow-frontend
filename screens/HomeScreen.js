
import { Button, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';

export default function HomeScreen({ navigation }) {
 return (
   <KeyboardAvoidingView
   behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
     <Text style={styles.title}>Sauve ta Pow</Text>
     <TextInput
        style={styles.input}
        placeholder="Firstname"
      />
      <TextInput
        style={styles.input}
        placeholder="Lastname"
      />
           <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TabNavigator')}>
        <Text style={styles.txt}>go</Text>
      </TouchableOpacity>
      </KeyboardAvoidingView>
 );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
      alignItems: 'center',
      padding:'5%'
    },
    image: {
width: '100%',
height:'50%'
      },
      title: {
        fontSize: 50,
        fontWeight: 'bold',
      },
      input:{
        borderBottomColor: '#EC6E5B',
        borderBottomWidth: 1,
        marginBottom: 12,
        width:'100%'
      },
      button:{
        backgroundColor:'#EC6E5B',
        width:'80%',
        borderRadius:10,
        padding:'3%'
      },
      txt:{
        textAlign:'center',
        color:'#ffffff',
        fontWeight:800
      }
   });