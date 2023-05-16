
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