
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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { keepUsername , keepToken } from '../reducers/user';

export default function UserScreen({ navigation }) {

  const [firstname, setFirstname] = useState('Prénom')
  const [lastname, setLastname] = useState('Nom')
  const [username, setUsername] = useState('Username')

  const token = useSelector((state) => state.user.token)
  // token du reducer 
  // const token = 'o8Z4q7zKRobH7VJ-AxxJsqxjtL5fqmAK'

  // fetch des infos du user en fonction du token 
  useEffect(() => {
    fetch(`https://sauve-ta-pow-backend.vercel.app/users/${token}`).then((response) => response.json()).then(data => {
      // dispatch articles dans le store 
      console.log(data)
      for(let infos of data.user) {
        // set toutes les infos nécésaires pour les placer sur la page 
        setFirstname(infos.firstname? infos.firstname : 'Prénom')
        setLastname(infos.lastname? infos.lastname : 'Nom')
        setUsername(infos.username? infos.username : 'Username')
      }
    })
  }, []);

  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);

  let uri 
  if(image === null) {
    uri = require('../assets/profile.png')
  } else {
    uri = { uri: image }
  }

  // Demande permission pour take une image dans la librairie et séléctionne une image 
  const pickImage = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasPermission(status === 'granted');
    // pernd image si autorisation good 
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result)
    // affiche image séléctionnée
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
    // !!!!! image à en envoyer en db 
  }
  
  // fonction qui gère la modal et choix photo de profil 
  const handleModalImage = () => {
    setModalVisible(true)
  }

  // remet l'image de base
  const handleDeletePhoto = () => {
    setImage(null)
  }

  let modal = (
  <Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  >
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <View style={styles.iconContainer}>
          <FontAwesome name='close' size={20} color='#D5D8DC' style={styles.plus} onPress={() => setModalVisible(!modalVisible)}/>
        </View>
        <Image style={styles.profileImageModal} source={uri} />
        <TouchableOpacity activeOpacity={-1} onPress={() => pickImage()}>
          <View style={styles.buttonsModalTop}>
            <Text>Choisir dans la galerie</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={-1} onPress={() => handleDeletePhoto()}>
          <View style={styles.buttonsModalBottom}>
            <Text>Supprimer la photo de profile</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
  )

  // handle la navigation vers les autres pages de user
  const handleGoToPersonnal = () => {
    navigation.navigate('PersonnalInfo')
  }
  const handleGoToHealth = () => {
    navigation.navigate('HealthInfo')
  }
  const handleGoToItineraries = () => {
    navigation.navigate('ItinerariesInfo')
  }
  const handleGoToHelp = () => {
    navigation.navigate('HelpInfo')
  }
  const handleGoToConfidential = () => {
    navigation.navigate('ConfidentialityInfo')
  }


 return (
  <SafeAreaView style={styles.container}>
   <View style={styles.container}>
    <View style={styles.topContainer}>
      <TouchableOpacity
        style={styles.avatar}
        onPress={() => handleModalImage()}
        // onPress={this._avatarClicked}
        >
        <Image style={styles.profileImage} source={uri} />
         <FontAwesome name='plus-circle' size={20} color='#D5D8DC' style={styles.plus}/>
      </TouchableOpacity>
      <Text style={styles.title}>{lastname} {firstname}</Text>
      <Text style={styles.username}>{username}</Text>
    </View>
    {modal}
    <TouchableOpacity activeOpacity={-1} onPress={() => handleGoToPersonnal()}>
      <View style={styles.buttons}>
        <Text>Informations personnelles</Text>
        <FontAwesome name='angle-right' size={30} color='#D5D8DC'/>
      </View>
    </TouchableOpacity>
    <TouchableOpacity activeOpacity={-1} onPress={() => handleGoToHealth()}>
      <View style={styles.buttons}>
        <Text>Fiche santé</Text>
        <FontAwesome name='angle-right' size={30} color='#D5D8DC'/>
      </View>
    </TouchableOpacity>
    <TouchableOpacity activeOpacity={-1} onPress={() => handleGoToItineraries()}>
      <View style={styles.buttons}>
        <Text>Mes itinéraires</Text>
        <FontAwesome name='angle-right' size={30} color='#D5D8DC'/>
      </View>
    </TouchableOpacity>
    <TouchableOpacity activeOpacity={-1} onPress={() => handleGoToHelp()}>
      <View style={styles.buttons}>
        <Text>Aide</Text>
        <FontAwesome name='angle-right' size={30} color='#D5D8DC'/>
      </View>
    </TouchableOpacity>
    <TouchableOpacity activeOpacity={-1} onPress={() => handleGoToConfidential()}>
      <View style={styles.buttons}>
        <Text>Politique de confidentialité</Text>
        <FontAwesome name='angle-right' size={30} color='#D5D8DC'/>
      </View>
    </TouchableOpacity>
    </View>
  </SafeAreaView>
 );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      // alignItems: 'center',
      // justifyContent: 'center',
    },
    topContainer: {
      height: 350,
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomColor: '#D5D8DC',
      borderBottomWidth: 0.5,
    },
    avatar: {
      marginBottom: 20,
      justifyContent: 'flex-end',
      alignItems: 'flex-end'
    },
    plus: {
      position: 'absolute',
      zIndex: 1,
    },
    title: {
      fontSize: 25,
      fontWeight: '600',
      marginBottom: 15,
    },
    username: {
      fontSize: 15,
    },
    profileImage: {
      height: 130,
      width: 130,
      borderRadius: 70,
    },
    buttons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      height: 60,
      borderColor: '#D5D8DC',
      borderWidth: 0.5,
      paddingLeft: 20,
      paddingRight: 15,
    },

    // MODAL 
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 50,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 1,
        height: 8,
      },
      shadowOpacity: 0.40,
      shadowRadius: 15,
      elevation: 5,
      height: '40%',
      width: '70%'
    },
    iconContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      backgroundColor: 'pink',
      width: 230,
      marginTop: 20
    },
    profileImageModal: {
      height: 70,
      width: 70,
      borderRadius: 50,
      marginBottom: 40,
      marginTop: 30,
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonsModalTop: {
      width: 260,
      height: 50,
      borderColor: '#D5D8DC',
      borderTopWidth: 1, 
      borderBottomWidth: 0.5, 
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonsModalBottom: {
      width: 260,
      height: 50,
      borderColor: '#D5D8DC',
      borderTopWidth: 0.5, 
      borderBottomWidth: 1, 
      justifyContent: 'center',
      alignItems: 'center',
    },
   });