import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Recapitinerary from "../components/Recapitinerary";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function ItineraryListScreen({ navigation }) {

  const token = useSelector((state) => state.user.token)

  // handle get itineraries 
  const [ myItineraries, setMyItineraries ] = useState([])

  // sert au useEffect de re render lors de l'ajout d'un itinéraire 
  const itiReducer = useSelector((state) => state.itineraries.value)

  useEffect(() => {
    fetch(`http://10.0.1.87:3000/itineraries/${token}`).then((response) => response.json()).then(data => {
      // ajoute mes itinéraires dans le state locale sous forme d'array d'objet
        setMyItineraries(data.itineraries)
    })
  }, [itiReducer])

  const allItineraries = myItineraries?.map((data, i) => {
    return <Recapitinerary key={i} {...data} style={styles.recapIti}/>
  })

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerMargin}>
        <Text style={styles.h1}>Mes itinéraires</Text>
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
        <ScrollView style={styles.scrollView}>
        {myItineraries.length? allItineraries : <Text>Aucun intinéraire enregistré</Text>} 
        </ScrollView>
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
    // marginBottom: 40
  },
  containerMargin: {
    margin: 20,
  },
  h1: {
    fontSize: 32,
    fontWeight: "bold",
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
  scrollView: {
    height: '71%'
  },
});
