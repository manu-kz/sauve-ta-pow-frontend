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
          <Text style={styles.link}>En savoir plus</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginBottom: 10,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowOffset: { width: 1, height: 2},
    shadowRadius: 3,
    elevation: 2,
    backgroundColor: '#FFFFFF',
    margin: 5,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'space-between',

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
    width: 150,
    height: 150,
  },
  textContainer: {
    padding: 20,
    width: "60%",
  },
});
