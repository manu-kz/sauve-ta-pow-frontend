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

export default function Recapitinerary() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.itineraryImg}
        source={require("../assets/map.jpg")}
      />
      <View style={styles.textContainer}>
        <Text style={styles.h2}>Nom</Text>
        <Text style={styles.p}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit aute irure
          dolor in reprehenderit...
        </Text>
        <Text style={styles.link}>En savoir plus</Text>
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
    width: '60%',
  }
});
