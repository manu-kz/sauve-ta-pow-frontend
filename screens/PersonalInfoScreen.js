import { 
    StyleSheet, 
    Text, 
    View,
    TouchableOpacity,
    Image, 
    SafeAreaView,
    Pressable,
    Modal,
    TextInput,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
  } from 'react-native';
  import { useEffect, useState } from 'react';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';

  export default function PersonalInfoScreen({navigation}) {

    const handleGoBack = () => {
        navigation.navigate('UserPage')
      }

      // fetch des infos du user en fonction du token 
      // set toutes les infos nécésaires pour els placer sur la page 
      //  route pour pouvoir modifier directement dans la db les infos personnelles 
    const [firstname, setFirstname] = useState('Useless Text');
    const [lastname, setLastname] = useState('Useless Text');
    const [username, setUsername] = useState('Useless Text');
    const [email, setEmail] = useState('Useless Text');
    const [phoneNumber, setPhoneNumber] = useState('Useless Text');
    const [dateOfBirth, setDateOfBirth] = useState('Useless Text');
    const [adresse, setAdresse] = useState('Useless Text');

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.pageContainer}>
                <FontAwesome name='angle-left' size={40} color='#D5D8DC' style={styles.backIcon} onPress={() => handleGoBack()}/>
                <Text style={styles.title} >Informations personnelles</Text>
              <KeyboardAvoidingView
               behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
               style={styles.personnalInfoContainer}>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.personnalInfoContainer}>
                  <TouchableOpacity style={styles.infos}>
                    <TextInput         
                    onChangeText={setFirstname}
                    value={firstname}/>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.infos}>
                    <TextInput         
                    onChangeText={setLastname}
                    value={lastname}/>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.infos}>
                    <TextInput         
                    onChangeText={setUsername}
                    value={username}/>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.infos}>
                    <TextInput         
                    onChangeText={setEmail}
                    value={email}/>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.infos}>
                    <TextInput         
                    onChangeText={setPhoneNumber}
                    value={phoneNumber}/>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.infos}>
                    <TextInput         
                    onChangeText={setDateOfBirth}
                    value={dateOfBirth}/>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.infos}>
                    <TextInput         
                    onChangeText={setAdresse}
                    value={adresse}/>
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
              </KeyboardAvoidingView>
            </View>
        </SafeAreaView>
    )
  }

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  pageContainer: {
        flex: 1,
        padding: 15,
    },
    backIcon: {
      margin: 10
    },
    title: {
      fontSize: 25,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    personnalInfoContainer: {
      padding: 5,
      alignItems: 'center',
    },
    infos: {
      width: 350,
      height: 50,
      borderColor: '#D5D8DC',
      borderWidth: 2,
      margin: 10,
      borderRadius: 20,
      // justifyContent: 'center',
      flexDirection: 'row',
      paddingLeft: 15,
    },
})