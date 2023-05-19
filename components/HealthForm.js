import { StyleSheet, Text, TextInput, Pressable } from "react-native";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { keepUsername, keepToken } from "../reducers/user";
import { showHealthForm } from "../reducers/modals";
export default function HealthForm({ navigation }) {
  const dispatch = useDispatch();

  //STATE FORM

  const socialSecurityNumber = useRef(null);
  const weight = useRef(null);
  const height = useRef(null);
  const smoker = useRef(null);
  const bloodType = useRef(null);
  const allergies = useRef(null);
  const treatment = useRef(null);
  const medicalHistory = useRef(null);
  const advanceDirectives = useRef(null);
  const trustedPerson = useRef(null);

  const [error, setError] = useState("");

  //SIGN UP FORM TO CREATE
  //   const fetchObj = {
  //     firstname: firstname.inputValue,
  //     lastname: lastname.inputValue,
  //     username: username.inputValue,
  //     email: email.inputValue,
  //     password: password.inputValue,
  //     phoneNumber: phoneNumber.inputValue,
  //     dateOfBirth: dateOfBirth,
  //     adresse: adresse.inputValue,
  //   };

  async function signup() {
    const rawRes = await fetch("http://10.0.1.43:3000/users/update", {
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
      <Text style={styles.h2}>Vos informations de santé</Text>
      <TextInput
        style={styles.input}
        placeholder="Sécurité Sociale*"
        ref={socialSecurityNumber}
        onChangeText={(value) => (socialSecurityNumber.inputValue = value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Poids*"
        ref={weight}
        onChangeText={(value) => (weight.inputValue = value)}
      />
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        placeholder="height*"
        autoComplete="username"
        ref={height}
        onChangeText={(value) => (height.inputValue = value)}
      />

      {/* TO DO   */}

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
