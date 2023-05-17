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
import { useDispatch } from "react-redux";
import { keepUsername, keepToken } from "../reducers/user";

export default function HomeScreen({ navigation }) {
  //STATE SIGN IN
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  //SIGN IN FORM
  async function login() {
    console.log("fetch");
    const rawRes = await fetch("http://10.0.1.43:3000/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, password: password }),
    });
    const jsonRes = await rawRes.json();

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

    
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalView}>
            <FontAwesome
              name="times"
              size={25}
              color="black"
              style={styles.cross}
              onPress={() => setModalVisible(!modalVisible)}
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
          </View>
        </Modal>

        <Pressable
          style={styles.buttonShortWhite}
          activeOpacity={0.8}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textButtonGrey}>Log In</Text>
        </Pressable>
      </KeyboardAvoidingView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:"100%",
    height:"100%",
    alignItems: "center",
    justifyContent: "center",
    
  },
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
  modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
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
    cross: {
      alignSelf: "flex-end",
    },
    textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonShortWhite: {
    width: 143,
    height: 43,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 100,
    margin: 5,
  },
  textButtonGrey: {
    color: "#8B9EAB",
    fontWeight: "700",
    fontSize: 16,
  },
});
