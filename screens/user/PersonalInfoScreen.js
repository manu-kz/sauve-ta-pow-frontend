import { 
    StyleSheet, 
    Text, 
    View,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
  } from 'react-native';
  import { useEffect, useState } from 'react';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  import { useSelector } from 'react-redux';

  export default function PersonalInfoScreen({navigation}) {

    const handleGoBack = () => {
        navigation.navigate('UserPage')
      }

    const token = useSelector((state) => state.user.token)

    const [firstname, setFirstname] = useState('Useless Text');
    const [lastname, setLastname] = useState('Useless Text');
    const [username, setUsername] = useState('Useless Text');
    const [email, setEmail] = useState('Useless Text');
    const [phoneNumber, setPhoneNumber] = useState('Useless Text');
    const [dateOfBirth, setDateOfBirth] = useState('Useless Text');
    const [adresse, setAdresse] = useState('Useless Text');

    // fetch des infos du user en fonction du token 
    useEffect(() => {
      fetch(`https://sauve-ta-pow-backend.vercel.app/users/${token}`).then((response) => response.json()).then(data => {
        // dispatch articles dans le store 
        for(let infos of data.user) {
          // set toutes les infos nécésaires pour les placer sur la page 
          setFirstname(infos.firstname? infos.firstname : 'vide')
          setLastname(infos.lastname? infos.lastname : 'vide')
          setUsername(infos.username? infos.username : 'vide')
          setEmail(infos.email? infos.email : 'vide')
           // mis en string pour être accepter dans l'input
          setPhoneNumber(infos.phoneNumber? infos.phoneNumber.toString() : 'vide')
          setDateOfBirth(infos.dateOfBirth? infos.dateOfBirth : 'vide')
          setAdresse(infos.adresse? infos.adresse : 'vide')
        }
      })
    }, []);

      //  route pour pouvoir modifier directement dans la db les infos personnelles 

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
                    value={firstname}/>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.infos}>
                    <TextInput         
                    value={lastname}/>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.infos}>
                    <TextInput         
                    value={username}/>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.infos}>
                    <TextInput         
                    value={email}/>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.infos}>
                    <TextInput         
                    keyboardType='numeric'
                    maxLength={10}
                    value={phoneNumber}/>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.infos}>
                    <TextInput         
                    value={dateOfBirth}/>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.infos}>
                    <TextInput         
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