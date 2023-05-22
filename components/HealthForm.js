import {
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  View,
  ScrollView,
} from "react-native";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { keepUsername, keepToken } from "../reducers/user";
import { showHealthForm } from "../reducers/modals";
import { setSignUpModal } from "../reducers/modals";
import { RadioButton } from "react-native-paper";

export default function HealthForm({ navigation }) {
  const dispatch = useDispatch();
  //TOKEN
  const token = useSelector((state) => state.user.token);

  //STATE FORM

  const socialSecurityNumber = useRef(null);
  const weight = useRef(null);
  const height = useRef(null);
  const bloodType = useRef(null);
  const drugUse = useRef(null);
  const allergies = useRef(null);
  const treatment = useRef(null);
  const medicalHistory = useRef(null);
  const trustedPerson = useRef(null);

  const [error, setError] = useState("");

  //SMOKER STATE
  const [doSmoke, setDoSmoke] = useState(false);

  //MEDICAL HISTORY STATE
  const [cardiacCase, setCardiacCase] = useState(false);
  const [pulmonaryCase, setpulmonaryCase] = useState(false);
  const [bloodHistory, setBloodHistory] = useState(false);
  const [neurologicalCase, setNeurologicalCase] = useState(false);

  //ADVANCE DIRECTIVE STATE
  const [advanceDirectives, setAdvanceDirectives] = useState(false);

  const medicalHistoryInfo = () => {
    if (cardiacCase || pulmonaryCase || bloodHistory || neurologicalCase) {
      return (
        <TextInput
          style={styles.input}
          placeholder="Historique Médicale Détails"
          ref={trustedPerson}
          onChangeText={(value) => (medicalHistory.inputValue = value)}
        />
      );
    }
  };

  // SIGN UP FORM TO CREATE

  async function signup() {
    const fetchObj = {
      token: token,
      socialSecurityNumber: socialSecurityNumber.inputValue,
      weight: weight.inputValue,
      height: height.inputValue,
      smoker: doSmoke,
      bloodType: bloodType.inputValue,
      drugUse: drugUse.inputValue,
      allergies: allergies.inputValue,
      treatment: treatment.inputValue,
      medicalHistory: {
        cardiacCase,
        pulmonaryCase,
        bloodHistory,
        neurologicalCase,
        info: medicalHistory.inputValue,
      },
      advanceDirectives,
      trustedPerson: {
        firstname: trustedPerson.firstnameInputValue,
        lastname: trustedPerson.lastnameInputValue,
        phoneNumber: trustedPerson.phoneNumberInputValue,
      },
    };

    console.log("ref", socialSecurityNumber.inputValue);

    const rawRes = await fetch("http://10.0.1.43:3000/users/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fetchObj),
    });
    const jsonRes = await rawRes.json();
    console.log("jsonRes", jsonRes);
    const { result, message } = jsonRes;

    if (!result) {
      setError("y'a une couille");
    } else {
      //Message d'erreur
      setError("Informations Enregistrés");
      dispatch(showHealthForm(false));
      dispatch(setSignUpModal(false));
    }
  }

  // USER PERSONAL INFO
  return (
    <>
      <Text style={styles.h2}>Vos informations de santé</Text>
      <ScrollView horizontal={false} style={styles.scrollView}>
        <TextInput
          style={styles.input}
          placeholder="Sécurité Sociale"
          inputMode="numeric"
          ref={socialSecurityNumber}
          onChangeText={(value) => (socialSecurityNumber.inputValue = value)}
        />
        <View style={styles.champNumeric}>
          <TextInput
            style={styles.inputNumeric}
            inputMode="numeric"
            placeholder="Poids"
            ref={weight}
            onChangeText={(value) => (weight.inputValue = value)}
          />
          <Text style={styles.metrics}>kg</Text>
        </View>
        <View style={styles.champNumeric}>
          <TextInput
            style={styles.inputNumeric}
            inputMode="numeric"
            placeholder="Taille"
            ref={height}
            onChangeText={(value) => (height.inputValue = value)}
          />
          <Text style={styles.metrics}>cm</Text>
        </View>

        <Text style={styles.h4}>Fumeur</Text>
        <View styles={styles.smokerView}>
          <Pressable
            style={[
              styles.smokerButton,
              { backgroundColor: !doSmoke ? "#FFB703" : "#8B9EAB" },
            ]}
            onPress={() => setDoSmoke(!doSmoke)}
          >
            <Text style={styles.p}> Non</Text>
          </Pressable>
          <Pressable
            style={[
              styles.smokerButton,
              { backgroundColor: doSmoke ? "#FFB703" : "#8B9EAB" },
            ]}
            onPress={() => setDoSmoke(!doSmoke)}
          >
            <Text style={styles.p}> Oui</Text>
          </Pressable>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Groupe Sanguin"
          ref={bloodType}
          onChangeText={(value) => (bloodType.inputValue = value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Conssomation de drogue"
          ref={drugUse}
          onChangeText={(value) => (drugUse.inputValue = value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Allergies"
          ref={allergies}
          onChangeText={(value) => (allergies.inputValue = value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Traitements"
          ref={treatment}
          onChangeText={(value) => (treatment.inputValue = value)}
        />
        <Text style={styles.h4}>Historique Médicale</Text>
        <ScrollView horizontal={true} indicatorStyle={"white"}>
          <Pressable
            style={[
              styles.medidcalHistoryButton,
              { backgroundColor: cardiacCase ? "#FFB703" : "#8B9EAB" },
            ]}
            onPress={() => setCardiacCase(!cardiacCase)}
          >
            <Text style={styles.p}> Cardiaque</Text>
          </Pressable>
          <Pressable
            style={[
              styles.medidcalHistoryButton,
              { backgroundColor: pulmonaryCase ? "#FFB703" : "#8B9EAB" },
            ]}
            onPress={() => setpulmonaryCase(!pulmonaryCase)}
          >
            <Text style={styles.p}> Pulmonaire</Text>
          </Pressable>
          <Pressable
            style={[
              styles.medidcalHistoryButton,
              { backgroundColor: bloodHistory ? "#FFB703" : "#8B9EAB" },
            ]}
            onPress={() => setBloodHistory(!bloodHistory)}
          >
            <Text style={styles.p}> Sanguin</Text>
          </Pressable>
          <Pressable
            style={[
              styles.medidcalHistoryButton,
              { backgroundColor: neurologicalCase ? "#FFB703" : "#8B9EAB" },
            ]}
            onPress={() => setNeurologicalCase(!neurologicalCase)}
          >
            <Text style={styles.p}> Neurologique</Text>
          </Pressable>
        </ScrollView>
        {medicalHistoryInfo()}

        <Text style={styles.h4}>Directives Avancées</Text>
        <View styles={styles.smokerView}>
          <Pressable
            style={[
              styles.smokerButton,
              { backgroundColor: !advanceDirectives ? "#FFB703" : "#8B9EAB" },
            ]}
            onPress={() => setAdvanceDirectives(!advanceDirectives)}
          >
            <Text style={styles.p}> Non</Text>
          </Pressable>
          <Pressable
            style={[
              styles.smokerButton,
              { backgroundColor: advanceDirectives ? "#FFB703" : "#8B9EAB" },
            ]}
            onPress={() => setAdvanceDirectives(!advanceDirectives)}
          >
            <Text style={styles.p}> Oui</Text>
          </Pressable>
        </View>

        <Text style={styles.h4}> Personne de Confiance </Text>
        <TextInput
          style={styles.input}
          placeholder="Prénom"
          ref={trustedPerson}
          onChangeText={(value) => (trustedPerson.firstnameInputValue = value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Nom"
          ref={trustedPerson}
          onChangeText={(value) => (trustedPerson.lastnameInputValue = value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Numéro de téléphone"
          inputMode="numeric"
          ref={trustedPerson}
          onChangeText={(value) =>
            (trustedPerson.phoneNumberInputValue = value)
          }
        />
      </ScrollView>

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
  h3: {
    fontSize: 20,
    fontWeight: "bold",
  },
  h4: {
    fontSize: 18,
    fontWeight: "bold",
  },
  p: {
    color: "white",
    fontSize: 12,
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
  champNumeric: {
    width: 273,
    height: 34,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#8B9EAB",
    paddingLeft: 10,
    margin: 5,
  },
  inputNumeric: {
    width: 230,
    // height: 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  metrics: {
    textAlign: "center",
    marginRight: 10,
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
  medidcalHistoryButton: {
    width: 90,
    height: 25,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#8B9EAB",
    borderRadius: 100,
    margin: 5,
  },
  smokerView: {
    display: "flex",
    flexDirection: "row",
  },
  smokerButton: {
    width: 50,
    height: 25,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
  scrollView: {
    width: "100%",
  },
});
