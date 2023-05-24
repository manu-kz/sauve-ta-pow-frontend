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
import { useDispatch, useSelector } from "react-redux";
import { openItinerary } from '../reducers/itineraries';


export default function Recapitinerary(props) {
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const handleEntireArticleNavigation = () => {
    dispatch(openItinerary(props))
    navigation.navigate('EntireItinerary')
  }

  // {"__v": 0, "_id": "646e41b8e3e943e12d3b02a0", "arrival": {"latitude": "45.764043", "longitude": "4.835659"},
  //  "arrivalName": "Lyon", "date": "2023-05-24T16:56:12.979Z", "departure": {"latitude": "45.77722199999999", "longitude": "3.087025"},
  //   "departureName": "Clermont-Ferrand",
  //    "itineraryImg": "/private/var/mobile/Containers/Data/Application/B5A3EB16-B30C-4A6C-AF6B-570EAA90C476/tmp/ABI48_0_0ReactNative/D89C71F0-2D7B-4A23-8A69-E14801E1CBAB.jpg", 
  //   "itineraryName": "name", "members": ["mathis"], "membersNumber": "2", "supervisor": "emi",
  //    "time": 2417.6666666666665, "waypoints": [[Object]], "waypointsName": ["Saint-Étienne"]}
  return (
    <View style={styles.container}>
      <Image
        style={styles.itineraryImg}
        source={{uri: props.itineraryImg }}
      />
      <View style={styles.textContainer}>
        <Text style={styles.h2}>{props.itineraryName}</Text>
        <Text style={styles.p}>Départ: {props.departureName}</Text>
        <Text style={styles.p}>Arrivée: {props.arrivalName}</Text>
        <TouchableOpacity activeOpacity={0.8}>
          <Text style={styles.link} onPress={() => handleEntireArticleNavigation()}>En savoir plus</Text>
        </TouchableOpacity>
      </View>
    </View>
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
