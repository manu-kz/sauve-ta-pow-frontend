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
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { keepUsername, keepToken } from "../../reducers/user";
import { showHealthForm } from "../../reducers/modals";

export default function SignUpForm({ navigation }) {
  //MODALS
  const dispatch = useDispatch();

  // DATE PICKER
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  //STATE SIGN UP

  const lastname = useRef(null);
  const firstname = useRef(null);
  const password = useRef(null);
  const username = useRef(null);
  const email = useRef(null);
  const phoneNumber = useRef(null);
  const dateOfBirth = date.toDateString();
  const adresse = useRef(null);

  const [error, setError] = useState("");

  //SIGN UP FORM TO CREATE
console.log('dateOfBirth', dateOfBirth)
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
    const rawRes = await fetch(
      "https://sauve-ta-pow-backend.vercel.app/users/signup",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fetchObj),
      }
    );
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
      dispatch(showHealthForm(true));
      setError("");
      dispatch(keepUsername(username.inputValue));
      dispatch(keepToken(token));
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

      <View style={styles.datePicker}>
        <Text style={{ color: "#B9B9BB" }}> Birthday*</Text>

        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
          minimumDate={new Date(1940, 1, 1)}
        />
      </View>

      <Pressable style={styles.button} onPress={() => signup()}>
        <Text style={styles.textStyle}> Suivant</Text>
      </Pressable>
      <Text>{error}</Text>
    </>
  );
}

const styles = StyleSheet.create({
  
  h2: {
    alignSelf:'flex-start',
    fontSize: 22,
    fontWeight: "bold",
    margin:10
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
  datePicker: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#EDEDED",
    marginBottom: 10,
    padding: 10,
    borderRadius: 20,
    width: 273,
    height: 45,
  },
});
