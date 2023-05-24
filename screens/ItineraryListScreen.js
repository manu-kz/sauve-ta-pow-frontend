import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import Recapitinerary from "../components/Recapitinerary";

export default function ItineraryListScreen({ navigation }) {
  const [emptyItinerary, setEmptyItinerary] = useState('Aucun intinéraire enregistré');
  const [isEmpty, setisEmpty] = useState(true);

  if(!isEmpty){
    setEmptyItinerary('')
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerMargin}>
        <Text style={styles.h1}>Mes itinéraires</Text>
        <Text style={styles.p}>{emptyItinerary}</Text>
        <TouchableOpacity
          style={styles.buttonBigWhite}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("Itineraries")}
        >
          <View activeOpacity={0.8} style={styles.buttonCircleGrey}>
            <Image
              source={require("../assets/Cross.png")}
              style={styles.icon}
            />
          </View>
          <Text style={styles.textButtonGrey}>Ajouter itinéraire</Text>
        </TouchableOpacity>
        <Recapitinerary />
        <View style={styles.whiteRectangle}></View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#FFFFFF",
  },
  containerMargin: {
    margin: 20,
  },
  h1: {
    fontSize: 32,
    fontWeight: "bold",
  },
  whiteRectangle: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    height: 15,
  },
  buttonCircleGrey: {
    width: 50,
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#8B9EAB",
    borderRadius: 100,
    padding: 15,
    marginLeft: 5,
    marginRight: "15%",
  },
  textButtonGrey: {
    color: "#8B9EAB",
    fontWeight: "700",
    fontSize: 16,
  },
  icon: {
    resizeMode: "contain",
    width: "100%",
  },
  buttonBigWhite: {
    width: "80%",
    height: 68,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#8B9EAB",
    borderRadius: 100,
    paddingLeft: 5,
    paddingRight: 10,
    margin: "10%",
  },
});
