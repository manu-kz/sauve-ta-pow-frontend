import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Platform,
  Alert,
  Modal,
  Pressable,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showCallModal } from "../reducers/modals";

export default function CallModal() {
  const dispatch = useDispatch();

  const callModal = useSelector((state) => state.modals.callModal);

  const step = [
    {
      number: 1,
      description:
        "Identifiez-vous. Indiquez votre nom et numéro de téléphone.",
    },
    { number: 2, description: "Expliquez le type d'accident" },
    {
      number: 3,
      description: "Précisez le nombre et l’état apparent des victimes.",
    },
    { number: 4, description: "Décrivez la situation." },
    { number: 5, description: "Précisez s’il y a des risques persistants." },
    {
      number: 6,
      description: "Indiquez votre localisation grâce à ces trois mots :",
    },
  ];

  const stepList = step.map((data, i) => {
    return (
      <View key={i} style={styles.stepList}>
        <View style={styles.numberContainer}>
          <Text style={styles.number}>{data.number}</Text>
        </View>
        <Text style={styles.p}>{data.description}</Text>
      </View>
    );
  });
  return (
    <Modal animationType="slide" transparent={true} visible={callModal}>
      <View style={styles.modalView}>
        <TouchableOpacity activeOpacity={0.8}>  
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
          <TouchableOpacity style={styles.loudspeakerBtn}>
            <Image
              source={require("../assets/loudspeaker.png")}
              style={styles.loudspeakerImg}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.hanguprBtn}>
            <Image
              source={require("../assets/hangup.png")}
              style={styles.loudspeakerImg}
            />
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
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: "10%",
  },
  loudspeakerBtn: {
    backgroundColor: "#52BD8F",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 50,
  },
  loudspeakerImg: {
    width: 40,
    height: 40,
  },
  hanguprBtn: {
    backgroundColor: "#F94A56",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 50,
  },
});
