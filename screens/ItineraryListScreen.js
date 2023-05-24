import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";

import Recapitinerary from '../components/Recapitinerary';


export default function ItineraryListScreen() {



  return (
   <SafeAreaView style={styles.container}>
    <View style={styles.containerMargin}>
    <Text style={styles.h1}>Mes itinéraires</Text>
    <Text style={styles.p}>Aucun intinéraire enregistré</Text>
    <View style={styles.buttonBigWhite} activeOpacity={0.8}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.buttonCircleGrey}
            >
              <Image
                source={require("../assets/Cross.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
            <Text style={styles.textButtonGrey}>Ajouter itinéraire</Text>
          </View>
          <Recapitinerary/>
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
    margin: 20
  },
  h1: {
    fontSize: 32,
    fontWeight: "bold",
  },  
  whiteRectangle: {
    backgroundColor: '#FFFFFF',
    width: '100%',
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
    width: '80%',
    height: 68,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: '#8B9EAB',
    borderRadius: 100,
    paddingLeft: 5,
    paddingRight: 10,
    margin: '10%',
  },
});
