import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { openItinerary } from '../reducers/itineraries';


export default function Recapitinerary(props) {
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const handleEntireItineraryNavigation = () => {
    dispatch(openItinerary(props))
    navigation.navigate('EntireItinerary')
  }

  return (
    <TouchableOpacity style={styles.container} onPress={() => handleEntireItineraryNavigation()}>
      <Image
        style={styles.itineraryImg}
        source={{uri: props.itineraryImg }}
      />
      <View style={styles.textContainer}>
        <Text style={styles.h2}>{props.itineraryName}</Text>
        <Text style={styles.p}>Départ: {props.departureName}</Text>
        <Text style={styles.p}>Arrivée: {props.arrivalName}</Text>
        <TouchableOpacity activeOpacity={0.8}>
          <Text style={styles.link}>En savoir plus</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: '#EAECEE',
    borderRadius: 20,
    marginBottom: 10,
    shadowColor: 'black',
    shadowOpacity: 0.30,
    shadowOffset: { width: 1, height: 2},
    shadowRadius: 5,
    elevation: 3,
    backgroundColor: '#FFFFFF',
    margin: 4,
    padding: 10,
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
