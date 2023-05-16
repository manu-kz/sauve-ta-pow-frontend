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
import { useRef } from "react";

export default function HomeScreen({ navigation }) {
  //SIGN UP

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  console.log(username)


//   async function login() {
//     const rawRes = await fetch("http://localhost:3000/users/signin",{
// 		method: 'POST',
// 		headers: { 'Content-Type': 'application/json' },
// 	    body: JSON.stringify({ username: usernameRef, password: passwordRef })
//     });
//     const jsonRes = await rawRes.json();
//     console.log('json', jsonRes)

// }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Text style={styles.title}>Sauve ta Pow</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        ref={usernameRef}
        onChangeText={(e) => (usernameRef.current.value = e)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(e) => (passwordRef.current.value = e)}
      />
      <TouchableOpacity style={styles.button} >
        <Text style={styles.txt}>Log In</Text>
      </TouchableOpacity>
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
