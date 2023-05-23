import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Modal,
  Pressable,
  SafeAreaView,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { keepUsername, keepToken } from "../../reducers/user";
import { setLoginModal, setSignUpModal } from "../../reducers/modals";

export default function LoginModal({ navigation }) {
  
  //MODALS
  const dispatch = useDispatch();
  const loginModal = useSelector((state) => state.modals.loginModal)
  const signUpModal = useSelector((state) => state.modals.signUpModal)

  //STATE SIGN IN
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  //SIGN IN FORM
  async function login() {
    console.log("fetch");
    const rawRes = await fetch("https://sauve-ta-pow-backend.vercel.app/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, password: password }),
    });
    const jsonRes = await rawRes.json();
    console.log('jsonRes', rawRes)
    const { token, result } = jsonRes;

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

        <Modal
          animationType="slide"
          transparent={true}
          visible={loginModal}

        >
          <View style={styles.modalView}>
            <FontAwesome
              name="close"
              size={20}
              color="#D5D8DC"
              style={styles.cross}
              onPress={() => dispatch(setLoginModal(false))}
            />
            <Text style={styles.h2}>Se connecter</Text>
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
              <Text style={styles.textStyle}>Log In</Text>
            </Pressable>
            {error && <Text>Missing or wrong identification</Text>}
            <Text onPress={()=> {dispatch(setLoginModal(false)), dispatch(setSignUpModal(true))}}>ou créer un compte</Text>
          </View>
        </Modal>
      
  );
}

const styles = StyleSheet.create({
  
  modalView: {
    height:"50%",
      margin: "5%",
      marginTop:"20%",
      backgroundColor: "white",
      borderRadius: 20,
      padding: 40,
      justifyContent: "space-between",
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },



  //INSIDE MODAL


  h2: {
    fontSize: 26,
    fontWeight: "bold",
  },
  input: {
    
      backgroundColor: "#EDEDED",
      marginBottom: 10,
      padding: 10,
      borderRadius: 20,
      width: 273,
      height: 34,
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
