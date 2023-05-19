import React, { useEffect, useState } from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { StyleSheet, View, Text } from "react-native";
import { Dimensions } from "react-native";
import * as Location from "expo-location";
import Constants from "expo-constants";
import MapViewDirections from "react-native-maps-directions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import SwipeUpDown from "react-native-swipe-up-down";
import SwipeItemMini from "../components/SwipeItemMini";
import SwipeItemFull from "../components/SwipeItemFull";


export default function App() {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [departure, setDeparture] = useState(null);
  const [wayPoint, setWayPoint] = useState([]);
  const [wayPointName, setWayPointName] = useState([]);
  const [arrival, setArrival] = useState(null);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(null);
  const [time, setTime] = useState("min");

  //Demande d'autorisation pour accéder à la localisation
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {
          //console.log('LOCATION', location.coords);
          setCurrentPosition(location.coords);
        });
      }
    })();
  }, []);

  // a mettre dans le back -- Utilisation de geocode pour convertir la valeur de l'input en coordonnées lat et lng
  const addDeparture = async (data, details) => {
    try {
      const placeId = details.place_id;
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&key=AIzaSyAYavTHYiwXdCbZQCvC5hIJ8_sE-T5ETII`
      );
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const location = data.results[0].geometry.location;
        const position = {
          latitude: location.lat,
          longitude: location.lng,
        };
        console.log("Position:", position);
        setDeparture(position);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération de la position:", error);
    }
  };
  const addWayPoint = async (data, details) => {
    try {
      const placeId = details.place_id;
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&key=AIzaSyAYavTHYiwXdCbZQCvC5hIJ8_sE-T5ETII`
      );
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const location = data.results[0].geometry.location;
        const position = {
          latitude: location.lat,
          longitude: location.lng,
        };
        console.log("Position:", position);
        setWayPoint([...wayPoint, position]);
        setWayPointName([
          ...wayPointName,
          details.structured_formatting.main_text,
        ]);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération de la position:", error);
    }
  };

  const addArrival = async (data, details) => {
    try {
      const placeId = details.place_id;
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&key=AIzaSyAYavTHYiwXdCbZQCvC5hIJ8_sE-T5ETII`
      );
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const location = data.results[0].geometry.location;
        const position = {
          latitude: location.lat,
          longitude: location.lng,
        };
        console.log("Position:", position);
        setArrival(position);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération de la position:", error);
    }
  };

  const itinerayLineOnReady = (args) => {
    if (args) {
      setDistance(args.distance);
      setDuration(args.duration);
    }
  };

  if (duration && duration > 60) {
    setDuration(duration / 60);
  }

  const wayPoints = wayPoint.map((waypoint, index) => (
    <Marker
      key={index}
      coordinate={waypoint}
      title={wayPointName[index]}
      pinColor="#8B9EAB"
    />
  ));

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        mapType="satellite"
      >
        {currentPosition && (
          <Marker
            coordinate={currentPosition}
            title="Ma position"
            pinColor="blue"
          />
        )}
        {departure && (
          <Marker coordinate={departure} title="Départ" pinColor="#F94A56" />
        )}
        {arrival && (
          <Marker coordinate={arrival} title="Arrivée" pinColor="#F94A56" />
        )}
        {departure && arrival && (
          <MapViewDirections
            style={styles.itineraryLine}
            origin={departure}
            destination={arrival}
            apikey="AIzaSyAYavTHYiwXdCbZQCvC5hIJ8_sE-T5ETII"
            strokeColor="#F94A56"
            strokeWidth={5}
            onReady={itinerayLineOnReady}
            mode="WALKING"
            waypoints={wayPoint}
          />
        )}
        {wayPoints}
      </MapView>

      <View style={styles.searchBarContainer}>
        <View style={styles.searchContainer}>
          <GooglePlacesAutocomplete
            style={[styles.input]}
            placeholder="Départ"
            onPress={addDeparture}
            query={{
              key: "AIzaSyAYavTHYiwXdCbZQCvC5hIJ8_sE-T5ETII",
              language: "fr",
            }}
          />
          <GooglePlacesAutocomplete
            style={[styles.input]}
            placeholder="Point de passage"
            onPress={addWayPoint}
            query={{
              key: "AIzaSyAYavTHYiwXdCbZQCvC5hIJ8_sE-T5ETII",
              language: "fr",
            }}
          />
          <GooglePlacesAutocomplete
            style={[styles.input]}
            placeholder="Arrivée"
            onPress={addArrival}
            query={{
              key: "AIzaSyAYavTHYiwXdCbZQCvC5hIJ8_sE-T5ETII",
              language: "fr",
            }}
          />
          {distance && duration ? (
            <View>
              <Text>Distance: {distance.toFixed(2)} km</Text>
              <Text>
                Temps: {Math.ceil(duration)} {time}
              </Text>
            </View>
          ) : null}
        </View>
      </View>

      <SwipeUpDown
        itemMini={() => <SwipeItemMini/>}
        itemFull={() => <SwipeItemFull/>}
        animation="spring"
        disableSwipeIcon={true}
        extraMarginTop={150}
        swipeHeight={180}
        iconColor="#A8A4A4"
        iconSize={30}
        style={styles.swipe}
      />
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
  searchBarContainer: {
    position: "absolute",
    width: "100%",
    backgroundColor: "#FFFFFF",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    padding: 8,
    borderRadius: 20,
    shadowColor: "#000000",
  },
  searchContainer: {
    marginTop: Constants.statusBarHeight,
  },
  swipe: {
    backgroundColor: '#FFFFFF',
  }, 

});
