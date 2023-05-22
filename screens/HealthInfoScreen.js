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
    ScrollView
  } from 'react-native';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  import { useEffect, useState } from 'react';

  export default function HealthInfoScreen({navigation}) {

    const handleGoBack = () => {
        navigation.navigate('UserPage')
      }

    // fetch des infos du user en fonction du token 
    // set toutes les infos nécésaires pour els placer sur la page 
    //  route pour pouvoir modifier directement dans la db les infos personnelles 
    // socialSecurityNumber,
    // weight,
    // height,
    // smoker,
    // bloodType,
    // allergies,
    // treatment,
    // medicalHistory,
    // advanceDirectives,
    // trustedPerson,
    const [socialSecurityNumber, setSocialSecurityNumber] = useState('Useless Text');
    const [weight, setWeight] = useState('Useless Text');
    const [height, setHeight] = useState('Useless Text');
    const [smoker, setSmoker] = useState('Useless Text');
    const [bloodType, setBloodType] = useState('Useless Text');
    const [allergies, setAllergies] = useState('Useless Text');
    const [treatment, setTreatment] = useState('Useless Text');
    const [medicalHistory, setMedicalHistory] = useState('Useless Text');
    const [advanceDirectives, setAdvanceDirectives] = useState('Useless Text');
    const [trustedPerson, setTrustedPerson] = useState('Useless Text');


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.pageContainer}>
                <FontAwesome name='angle-left' size={40} color='#D5D8DC' style={styles.backIcon} onPress={() => handleGoBack()}/>
                <Text style={styles.title} >Informations de santé</Text>
              <KeyboardAvoidingView
               behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.personnalInfoContainer}>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView style={styles.scrollViewContainer}>
                    <View style={styles.personnalInfoContainer}>
                        <TouchableOpacity style={styles.infos}>
                            <TextInput         
                            onChangeText={setSocialSecurityNumber}
                            value={socialSecurityNumber}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.infos}>
                            <TextInput         
                            onChangeText={setWeight}
                            value={weight}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.infos}>
                            <TextInput         
                            onChangeText={setHeight}
                            value={height}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.infos}>
                            <TextInput         
                            onChangeText={setSmoker}
                            value={smoker}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.infos}>
                            <TextInput         
                            onChangeText={setBloodType}
                            value={bloodType}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.infos}>
                            <TextInput         
                            onChangeText={setAllergies}
                            value={allergies}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.infos}>
                            <TextInput         
                            onChangeText={setTreatment}
                            value={treatment}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.infos}>
                            <TextInput         
                            onChangeText={setMedicalHistory}
                            value={medicalHistory}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.infos}>
                            <TextInput         
                            onChangeText={setAdvanceDirectives}
                            value={advanceDirectives}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.infos}>
                            <TextInput         
                            onChangeText={setTrustedPerson}
                            value={trustedPerson}/>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
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
        scrollViewContainer: {
            alignItems: 'center'
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