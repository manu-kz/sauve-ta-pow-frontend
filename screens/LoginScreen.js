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
  SafeAreaView
} from "react-native";
import { useRef } from "react";
import Login from '../components/Login'

export default function HomeScreen({ navigation }) {
  
  return (
    <SafeAreaView style={styles.container}>
      <Login/>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "",
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
