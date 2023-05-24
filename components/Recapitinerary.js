import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Button,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from 'react-redux';


export default function Recapitinerary(props) {

 

  return (
    <View style={styles.container}>
      <Image
        style={styles.itineraryImg}
        source={require("../assets/map.jpg")}
      />
      <View style={styles.textContainer}>
        <Text style={styles.h2}>{props.name}</Text>
        <Text style={styles.p}>Départ: {props.departure}</Text>
        <Text style={styles.p}>Arrivée: {props.arrival}</Text>
        <TouchableOpacity
          activeOpacity={0.8}
        >
          <Text style={styles.link}>En savoir plus</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  link: {
    color: "#8B9EAB",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 15,
  },
  h2: {
    fontSize: 20,
    fontWeight: "bold",
  },
  p: {
    fontSize: 16,
  },
  itineraryImg: {
    borderRadius: 10,
    marginTop: "5%",
    width: 150,
    height: 150,
    marginBottom: "5%",
  },
  textContainer: {
    padding: 20,
    width: "60%",
  },
});
