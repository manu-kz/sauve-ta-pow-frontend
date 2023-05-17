import React from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { Dimensions } from "react-native";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Constants from "expo-constants";

export default function App() {
  const [currentPosition, setCurrentPosition] = useState(null);

  //Demande d'autorisation pour accéder à la localisation
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {
          //console.log(location.coords);
          setCurrentPosition(location.coords);
        });
      }
    })();
  }, []);

  const { width, height } = Dimensions.get("window");
  const ASPECT_RATIO = width / height;
  const LATIDUDE_DELTA = 0.02;
  const LONGITUDE_DELTA = LATIDUDE_DELTA * ASPECT_RATIO;
  /* const INTIAL_POSITION = {
    latitude: currentPosition.latitude,
    longitude: currentPosition.longitude,
    latitudeDelta: LATIDUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
    }*/

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        //initialRegion={INTIAL_POSITION}
      />
      <View style={styles.searchContainer}>
      <GooglePlacesAutocomplete style={styles.input}
        placeholder="Search"
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details);
        }}
        query={{
          key: "AIzaSyAYavTHYiwXdCbZQCvC5hIJ8_sE-T5ETII",
          language: "fr",
        }}
      />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  searchContainer:{
    position: "absolute",
    width: "100%",
    backgroundColor: '#FFFFFF',
    shadowColor: "#000000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    padding: 8,
    borderRadius: 8,
    top: Constants.statusBarHeight,

  },
  input: {
  }
});


