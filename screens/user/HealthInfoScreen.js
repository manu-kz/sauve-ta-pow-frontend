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
    ScrollView
  } from 'react-native';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  import { useEffect, useState } from 'react';
  import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
  import { useSelector } from 'react-redux';

  export default function HealthInfoScreen({navigation}) {

    const handleGoBack = () => {
        navigation.navigate('UserPage')
      }

    const token = useSelector((state) => state.user.token)

    // set toutes les infos nécésaires pour les placer sur la page 
    const [socialSecurityNumber, setSocialSecurityNumber] = useState('Useless Text');
    const [weight, setWeight] = useState('Useless Text');
    const [height, setHeight] = useState('Useless Text');
    const [smoker, setSmoker] = useState('Useless Text');
    const [bloodType, setBloodType] = useState('Useless Text');
    const [allergies, setAllergies] = useState('Useless Text');
    const [treatment, setTreatment] = useState('Useless Text');
    const [medicalHistory, setMedicalHistory] = useState({});
    const [advanceDirectives, setAdvanceDirectives] = useState('Useless Text');
    const [trustedPerson, setTrustedPerson] = useState({});


    // fetch des infos du user en fonction du token 
    useEffect(() => {
      fetch(`https://sauve-ta-pow-backend.vercel.app/users/${token}`).then((response) => response.json()).then(data => {
        // dispatch articles dans le store 
        for(let infos of data.user) {
          // set toutes les infos nécésaires pour les placer sur la page 
          setSocialSecurityNumber(infos.socialSecurityNumber? infos.socialSecurityNumber.toString(): 'Numéro de sécurité social')
          setWeight(infos.weight? infos.weight.toString() : 'Poids')
          setHeight(infos.height? infos.height.toString() : 'Taille')
          setSmoker(infos.smoker? infos.smoker : 'Fumeur')
          setBloodType(infos.bloodType? infos.bloodType : 'Groupe sanguin')
          setAllergies(infos.allergies? infos.allergies : 'Allergies')
          setTreatment(infos.treatment? infos.treatment : 'Traitements')
          setMedicalHistory(infos.medicalHistory)
          setAdvanceDirectives(infos.advanceDirectives? infos.advanceDirectives : 'Directives avancées')
          setTrustedPerson(infos.trustedPerson)
        }
      })
    }, []);

    // gestion des menus déroulant des informations sous forme d'objet 
    const [visible, setVisible] = useState(false);
    
    const hideMenu = () => setVisible(false);
    
    const showMenu = () => setVisible(true);

    // fonction qui fait le menu déroulant de l'objet des antécédant médicaux
    const menuMedicalHistory = (objet, title) => {
      return (
        <Menu
        visible={visible}
        anchor={<Text onPress={showMenu}>{title}</Text>}
        onRequestClose={hideMenu}
        >
          <MenuItem onPress={hideMenu}>{objet.bloodHistory? objet.bloodHistory : 'vide'}</MenuItem>
          <MenuItem onPress={hideMenu}>{objet.cardiacCase? objet.cardiacCase : 'vide'}</MenuItem>
          <MenuItem disabled>{objet.info? objet.info : 'vide'}</MenuItem>
          <MenuItem disabled>{objet.neurologicalCase? objet.neurologicalCase : 'vide'}</MenuItem>
          <MenuItem disabled>{objet.pulmonaryCase? objet.pulmonaryCase : 'vide'}</MenuItem>
          <MenuDivider />
        </Menu>
      )
    }

    // fonction qui fait le menu déroulant de l'objet de la personne de confiance
    const menuTrustedPerson = (objet, title) => {
      return (
        <Menu
        visible={visible}
        anchor={<Text onPress={showMenu}>{title}</Text>}
        onRequestClose={hideMenu}
        >
          <MenuItem onPress={hideMenu}>{objet.firstname? objet.firstname : 'vide'}</MenuItem>
          <MenuItem onPress={hideMenu}>{objet.lastname? objet.lastname : 'vide'}</MenuItem>
          <MenuItem disabled>{objet.phoneNumber? objet.phoneNumber : 'vide'}</MenuItem>
          <MenuDivider />
        </Menu>
      )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.pageContainer}>
                <FontAwesome name='angle-left' size={40} color='#D5D8DC' style={styles.backIcon} onPress={() => handleGoBack()}/>
                <Text style={styles.title} >Informations de santé</Text>
                <ScrollView style={styles.scrollViewContainer}>
                <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                        <TouchableOpacity style={styles.menu}>
                            {menuMedicalHistory(medicalHistory, 'Antécédants médicaux')}
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.infos}>
                            <TextInput         
                            onChangeText={setAdvanceDirectives}
                            value={advanceDirectives}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menu}>
                            {menuTrustedPerson(trustedPerson, 'Personne de confinace')}
                        </TouchableOpacity>
                    </View>
              </TouchableWithoutFeedback>
              </KeyboardAvoidingView>
              </ScrollView>
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
          marginLeft: 20
        },
        personnalInfoContainer: {
          padding: 5,
          alignItems: 'center',
        },
        infos: {
          width: 340,
          height: 50,
          borderColor: '#D5D8DC',
          borderWidth: 2,
          margin: 10,
          borderRadius: 20,
          flexDirection: 'row',
          paddingLeft: 15,
        },
        menu: {
          width: 340,
          height: 50,
          borderColor: '#D5D8DC',
          borderWidth: 2,
          margin: 10,
          borderRadius: 20,
          flexDirection: 'row',
          paddingLeft: 15,
          alignItems: 'center' 
        }
  })