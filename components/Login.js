import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { keepUsername, keepToken } from "../reducers/user";

export default function HomeScreen({ navigation }) {
  //SIGN UP
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  console.log(username);

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
        setError(false)
      dispatch(keepUsername(username));
      dispatch(keepToken(token));
      
    } else {
      //Message d'erreur
      setError(true)
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Text style={styles.title}>Sauve ta Pow</Text>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        placeholder="Username"
        onChangeText={(value) =>{ setUsername(value), setError(false)}}
        value={username}
      />
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="Password"
        onChangeText={(value) => {setPassword(value), setError(false)}}
        value={password}
      />
      <TouchableOpacity style={styles.button} onPress={() => login()}>
        <Text style={styles.txt}>Log In</Text>
      </TouchableOpacity>
      {error && <Text>Missing or wrong identification</Text>}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    padding: "5%",
  },
  image: {
    width: "100%",
    height: "50%",
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
  },
  input: {
    borderBottomColor: "#EC6E5B",
    borderBottomWidth: 1,
    marginBottom: 12,
    width: "100%",
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
  txt: {
    textAlign: "center",
    color: "#ffffff",
    fontWeight: 800,
  },
});
