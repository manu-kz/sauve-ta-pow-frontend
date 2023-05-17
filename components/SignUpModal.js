import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  Alert,
  Modal,
  Pressable,
  SafeAreaView,
} from "react-native";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { keepUsername, keepToken } from "../reducers/user";
import { setLoginModal, setSignUpModal } from "../reducers/modals";

export default function SignUpModal({ navigation }) {
  //MODALS
  const dispatch = useDispatch();
  const loginModal = useSelector((state) => state.modals.loginModal);
  const signUpModal = useSelector((state) => state.modals.signUpModal);
  console.log("signUpModal", signUpModal);

  //STATE SIGN UP
  const [firstName, setFirstName] = useState("");
  const [lasttName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  //SIGN UP FORM TO CREATE
  async function login() {
    console.log("fetch");
    const rawRes = await fetch("http://10.0.1.43:3000/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    const jsonRes = await rawRes.json();

    if (result) {
      setError(false);
      dispatch(keepUsername(username));
      dispatch(keepToken(token));
      setModalVisible(!modalVisible);
    } else {
      //Message d'erreur
      setError(true);
    }
  }

  return (
    <Modal animationType="slide" transparent={true} visible={signUpModal}>
      <View style={styles.modalView}>
        <FontAwesome
          name="times"
          size={25}
          color="black"
          style={styles.cross}
          onPress={() => dispatch(setSignUpModal(false))}
        />
        
          <Text style={styles.h2}>S'inscrire</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            placeholder="Nom"
            onChangeText={(value) => {
              setUsername(value), setError(false);
            }}
            value={username}
          />
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            placeholder="Prénom"
            onChangeText={(value) => {
              setUsername(value), setError(false);
            }}
            value={username}
          />
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            placeholder="Username"
            onChangeText={(value) => {
              setUsername(value), setError(false);
            }}
            value={username}
          />
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder="Password"
            onChangeText={(value) => {
              setPassword(value), setError(false);
            }}
            value={password}
          />
       
        <Pressable style={styles.button} onPress={() => login()}>
          <Text style={styles.textStyle}> Suivant</Text>
        </Pressable>
        {error && <Text>Missing or wrong identification</Text>}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    height: "50%",
    margin: "5%",
    marginTop: "20%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 40,
    justifyContent: "space-evenly",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },

  centeredVertical: {
    flex: 1,
    justifyContent: "center",
  },

  //INSIDE MODAL

  h2: {
    fontSize: 26,
    fontWeight: "bold",
  },
  input: {
    width: 273,
    height: 34,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#8B9EAB",
    paddingLeft: 10,
    margin: 5,
  },

  button: {
    width: 143,
    height: 43,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#8B9EAB",
    borderRadius: 100,
    margin: 5,
  },
  cross: {
    alignSelf: "flex-end",
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
