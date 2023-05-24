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
import { showHealthForm } from "../../reducers/modals";
import { showLoginProcess } from "../../reducers/user";

export default function HealthForm({ navigation }) {
  const dispatch = useDispatch();

  //TOKEN
  const token = useSelector((state) => state.user.token);

  //USEREF HEALTH FORM

  const socialSecurityNumber = useRef(null);
  const weight = useRef(null);
  const height = useRef(null);
  const bloodType = useRef(null);
  const drugUse = useRef(null);
  const allergies = useRef(null);
  const treatment = useRef(null);
  const medicalHistory = useRef(null);
  const trustedPerson = useRef(null);

  // USE STATE : Smoker yes or not
  const [doSmoke, setDoSmoke] = useState(false);

  // USE STATE : Medical History
  const [cardiacCase, setCardiacCase] = useState(false);
  const [pulmonaryCase, setpulmonaryCase] = useState(false);
  const [bloodHistory, setBloodHistory] = useState(false);
  const [neurologicalCase, setNeurologicalCase] = useState(false);

  // USE STATE : Advance Directives yes or no
  const [advanceDirectives, setAdvanceDirectives] = useState(false);

  //ERROR MESSAGE 
  const [error, setError] = useState("");



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



  // SIGN UP FUNCTION THAT SENDS INFO TO DB

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

    const rawRes = await fetch(
      "https://sauve-ta-pow-backend.vercel.app/users/update",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fetchObj),
      }
    );
    const jsonRes = await rawRes.json();
    console.log("Response Update DB ", jsonRes);
    const { result, message } = jsonRes;
    if (!result) {
      setError("Il'y a un problème, merci de réessayer");
    } else {
      //Message d'erreur
      setError("Informations Enregistrés");
      dispatch(showHealthForm(false));
      dispatch(showLoginProcess(false));
    }
  }



  // USER HEALTH FORM
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

        <View style={styles.yesNoContainer}>
          <Text style={styles.h4}>Fumeur</Text>
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

        <View style={styles.yesNoContainer}>
          <Text style={styles.h4}>Directives Avancées</Text>
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
    alignSelf: "flex-start",
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
  },
  h4: {
    fontSize: 14,
    fontWeight: "bold",
  },
  p: {
    color: "white",
    fontSize: 12,
  },
  input: {
    backgroundColor: "#EDEDED",
    marginVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    width: "100%",
    height: 34,
  },
  champNumeric: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#EDEDED",
    marginVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    width: "100%",
    height: 34,
  },
  inputNumeric: {
    width: 200,

    display: "flex",
    flexDirection: "row",
    backgroundColor: "#EDEDED",
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
  yesNoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginVertical: 5,
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
