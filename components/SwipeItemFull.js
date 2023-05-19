import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  Platform,
} from "react-native";
import React, { useState } from "react";

export default function SwipeItemFull() {
  const [itineraryName, setItineraryName] = useState("");
  const [numberParticipants, setNumberParticipants] = useState(0);
  const [date, setDate] = useState("");
  const [members, setmembers] = useState([]);
  const [supervisor, setSupervisor] = useState([]);
  const [hike, setHike] = useState([]);
  const [snowshoe, setSnowshoe] = useState(false);
  const [mountaineering, setMountaineering] = useState(false);
  const [ski, setSki] = useState(false);
  const [snowBoard, setSnowBoard] = useState(false);

  const handleSubmit = () => {
    console.log(itineraryName, numberParticipants, date);
  };

  return (
    <View style={styles.container}>
      <View style={styles.ligneIconContainer}>
        <View style={styles.ligneIcon}></View>
      </View>
      <Text style={styles.h2}>Planifier mon trajet</Text>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.formContainer}>
          <View style={styles.inputSection}>
            <Image style={styles.itinaryImg} />
            <View style={styles.inputSectionTwo}>
              <TextInput
                style={styles.input}
                placeholder="Nom de l'itinéraire"
                maxLength="20"
                onChangeText={(value) => setItineraryName(value)}
                value={itineraryName}
              />
              <View style={styles.inputSectionThree}>
                <TextInput
                  style={styles.inputSmall}
                  placeholder="Participants"
                  inputMode="numeric"
                  onChangeText={(value) => setNumberParticipants(value)}
                  value={numberParticipants}
                />
                <TextInput
                  style={styles.inputSmall}
                  placeholder="Date"
                  onChangeText={(value) => setDate(value)}
                  value={date}
                />
              </View>
            </View>
          </View>
          <TextInput style={styles.input} placeholder="Ajouter un membre" />
          <TextInput style={styles.input} placeholder="Ajouter un encadrant" />
          <Text style={styles.h3}>Discipline(s)</Text>
          <View style={styles.disciplinesContainer}>
            <View style={styles.discipline}>
              <Image
                style={styles.disciplineImg}
                source={require("../assets/diciplinesIcons/snowshoe.png")}
              />
            </View>
            <View style={styles.discipline}>
              <Image
                style={styles.disciplineImg}
                source={require("../assets/diciplinesIcons/hike.png")}
              />
            </View>
            <View style={styles.discipline}>
              <Image
                style={styles.disciplineImg}
                source={require("../assets/diciplinesIcons/mountaineering.png")}
              />
            </View>
            <View style={styles.discipline}>
              <Image
                style={styles.disciplineImg}
                source={require("../assets/diciplinesIcons/ski.png")}
              />
            </View>
            <View style={styles.discipline}>
              <Image
                style={styles.disciplineImg}
                source={require("../assets/diciplinesIcons/snowboard.png")}
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.buttonLong}
            activeOpacity={0.8}
            onPress={() => handleSubmit()}
          >
            <Text style={styles.textButtonWhite}>Enregistrer</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "5%",
  },
  h2: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: "10%",
  },
  formContainer: {
    marginTop: "5%",
  },
  input: {
    backgroundColor: "#EDEDED",
    marginBottom: 10,
    padding: 10,
    borderRadius: 20,
  },
  disciplinesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "5%",
  },
  disciplinesTitle: {
    marginTop: "5%",
  },
  discipline: {
    backgroundColor: "#EDEDED",
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  disciplineImg: {
    width: 40,
    height: 40,
  },
  buttonLong: {
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#8B9EAB",
    borderRadius: 50,
    marginTop: "10%",
  },
  textButtonWhite: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 16,
  },
  h3: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: "5%",
  },
  itinaryImg: {
    backgroundColor: "#EDEDED",
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  inputSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputSectionTwo: {
    width: "65%",
  },
  inputSectionThree: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputSmall: {
    width: "45%",
    backgroundColor: "#EDEDED",
    padding: 10,
    borderRadius: 20,
  },
  ligneIconContainer: {
    alignItems: "center",
  },
  ligneIcon: {
    backgroundColor: "#A8A4A4",
    width: "15%",
    height: 3,
    borderRadius: 5,
  },
});
