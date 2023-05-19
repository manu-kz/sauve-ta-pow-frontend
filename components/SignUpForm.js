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
  Button,
} from "react-native";
import DatePicker from "react-native-datepicker"; //https://www.npmjs.com/package/react-native-datepicker
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { keepUsername, keepToken } from "../reducers/user";
import { showHealthForm } from "../reducers/modals";

export default function SignUpForm({ navigation }) {
  //MODALS
  const dispatch = useDispatch();

  //STATE SIGN UP

  const lastname = useRef(null);
  const firstname = useRef(null);
  const password = useRef(null);
  const username = useRef(null);
  const email = useRef(null);
  const phoneNumber = useRef(null);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const adresse = useRef(null);

  const [error, setError] = useState("");

  //SIGN UP FORM TO CREATE

  async function signup() {
    const fetchObj = {
      firstname: firstname.inputValue,
      lastname: lastname.inputValue,
      username: username.inputValue,
      email: email.inputValue,
      password: password.inputValue,
      phoneNumber: phoneNumber.inputValue,
      dateOfBirth: dateOfBirth,
      adresse: adresse.inputValue,
    };
    const rawRes = await fetch("http://10.0.1.43:3000/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fetchObj),
    });
    const jsonRes = await rawRes.json();
    console.log("jsonRes", jsonRes);
    const { token, result, error } = jsonRes;

    if (!result && error === "Missing or empty fields") {
      setError("Informations obligatoires manquantes");
    } else if (!result && error === "Username already used") {
      setError("Pseudo déjà utilisé");
    } else if (!result && error === "Email already used") {
      setError("Email déjà utilisé");
    } else {
      //Message d'erreur
      setError("");
      dispatch(keepUsername(username.inputValue));
      dispatch(keepToken(token));
      dispatch(showHealthForm(true));
    }
  }

  // USER PERSONAL INFO
  return (
    <>
      <Text style={styles.h2}>S'inscrire</Text>
      <TextInput
        style={styles.input}
        placeholder="Nom*"
        ref={lastname}
        onChangeText={(value) => (lastname.inputValue = value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Prénom*"
        ref={firstname}
        onChangeText={(value) => (firstname.inputValue = value)}
      />
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        placeholder="Pseudo*"
        autoComplete="username"
        ref={username}
        onChangeText={(value) => (username.inputValue = value)}
      />
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        autoComplete="new-password"
        placeholder="Mot de Passe*"
        ref={password}
        onChangeText={(value) => (password.inputValue = value)}
      />
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        autoComplete="email"
        inputMode="email"
        placeholder="Email*"
        ref={email}
        onChangeText={(value) => (email.inputValue = value)}
      />

      <TextInput
        style={styles.input}
        autoComplete="cc-number"
        placeholder="Numéro Portable*"
        ref={phoneNumber}
        onChangeText={(value) => (phoneNumber.inputValue = value)}
      />

      <TextInput
        style={styles.input}
        placeholder="Adresse*"
        ref={adresse}
        onChangeText={(value) => (adresse.inputValue = value)}
      />
      <DatePicker
        date={dateOfBirth}
        mode="date"
        placeholder="Date Of Birth"
        format="YYYY-MM-DD"
        minDate="1940-01-01"
        maxDate="2023-01-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            display: "none",
          },
          dateInput: {
            position: "absolute",
            zIndex: 0,
            width: 273,
            height: 34,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
            borderRadius: 100,
            borderWidth: 0,
            borderColor: "#8B9EAB",
            paddingLeft: 10,
            margin: 5,
          },
        }}
        onDateChange={(date) => {
          setDateOfBirth(date);
        }}
      />
      <Pressable style={styles.button} onPress={() => signup()}>
        <Text style={styles.textStyle}> Suivant</Text>
      </Pressable>
      <Text>{error}</Text>
    </>
  );
}

const styles = StyleSheet.create({
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
