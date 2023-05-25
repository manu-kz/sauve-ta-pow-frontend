import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { showCallModal } from "../reducers/modals";
import { useEffect, useState } from 'react';
import { Linking } from 'react-native';


export default function CallModal() {
  const dispatch = useDispatch();
  const callModal = useSelector((state) => state.modals.callModal);
  const localisation = useSelector((state) => state.user.location)
  const localisationArr = localisation.split(',')
  const [wordOne, setwordOne] = useState('');
  const [wordTwo, setwordTwo] = useState('');
  const [wordThree, setwordThree] = useState('');

  useEffect(() => {
    fetch(`https://sauve-ta-pow-backend.vercel.app/itineraries/what3words/${localisationArr[1]}/${localisationArr[0]}`)
      .then(response => response.json())
      .then(data => {
        const wordsData = data.what3words.words.split('.')
        setwordOne(wordsData[0])
        setwordTwo(wordsData[1])
        setwordThree(wordsData[2])
      });
  }, []);

  const step = [
    { number: 1, description: "Identifiez-vous. Indiquez votre nom et numéro de téléphone." },
    { number: 2, description: "Expliquez le type d'accident" },
    { number: 3, description: "Précisez le nombre et l’état apparent des victimes." },
    { number: 4, description: "Décrivez la situation." },
    { number: 5, description: "Précisez s’il y a des risques persistants." },
    { number: 6, description: `Indiquez votre localisation grâce à ces trois mots: ${wordOne}, ${wordTwo}, ${wordThree}` },
  ];

  const stepList = step.map((data, i) => (
    <View key={i} style={styles.stepList}>
      <View style={styles.numberContainer}>
        <Text style={styles.number}>{data.number}</Text>
      </View>
      <Text style={styles.p}>{data.description}</Text>
    </View>
  ));

 //CALL 112
  const phoneCall = () => {
    const phoneNumber = '+33698836092'; 
  
    Linking.openURL(`tel:${phoneNumber}`);
  };
  
  return (
    <Modal animationType="slide" transparent={true} visible={callModal}>
      <View style={styles.modalView}>
        <TouchableOpacity activeOpacity={1}>  
        <FontAwesome
          name="close"
          size={20}
          color="#D5D8DC"
          style={styles.cross}
          onPress={() => dispatch(showCallModal(false))}
        />
        </TouchableOpacity>
        <View style={styles.header}>
          <Text style={styles.h2}>Appel des secours</Text>
          <Text style={styles.p}>Les étapes à suivre :</Text>
        </View>
        {stepList}
        <View style={styles.btnContainer}>
        <TouchableOpacity activeOpacity={1} style={styles.phoneCallBtn} onPress={() => phoneCall()}> 
        <Image source={require('../assets/picto_phone.png')} style={styles.phoneCall}/>
        </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    margin: "5%",
    marginTop: "20%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },

  h2: {
    fontSize: 26,
    fontWeight: "bold",
  },

  cross: {
    alignSelf: "flex-end",
  },
  stepList: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    width: "80%",
  },
  numberContainer: {
    backgroundColor: "#8B9EAB",
    padding: 5,
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  number: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  header: {
    marginBottom: "10%",
  },
  phoneCallBtn: {
    borderRadius: 50,
    backgroundColor: '#52BD8F',
    height: 80,
    width: 80,
    justifyContent: "center",
    alignItems: 'center'

  },
  phoneCall: {
    height: 50,
    width: 50,
    },
    btnContainer: {
      alignItems: 'center',
      marginTop: '10%'
    }
});
