import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
// Dimention pour que le text se place correctement dans la window. Pour qu'il ne soit pas coupé
import { Dimensions } from "react-native";
// MAP
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import * as Location from "expo-location";
import Constants from "expo-constants";
import MapViewDirections from "react-native-maps-directions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
//SWIPE
import SwipeUpDown from "react-native-swipe-up-down";
import SwipeItemFull from "../../components/SwipeItemFull";
// REDUX & REDUCER
import { useDispatch } from "react-redux";
import { addItineraryFirstPart } from "../../reducers/itineraries";
//CAPTURE D'ECRAN
import { captureRef } from "react-native-view-shot";

export default function ItinerariesScreen() {

  const dispatch = useDispatch()

  const [currentPosition, setCurrentPosition] = useState(null);
  const [departure, setDeparture] = useState(null);
  const [ departureName, setDepartureName ] = useState('')
  const [ arrivalName, setArrivalName ] = useState('')
  const [wayPoint, setWayPoint] = useState([]);
  const [wayPointName, setWayPointName] = useState([]);
  const [arrival, setArrival] = useState(null);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);

  //Demande d'autorisation pour accéder à la localisation
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {
          setCurrentPosition(location.coords);
        });
      }
    })();
  }, []);

  //Utilisation de geocode pour convertir la valeur de l'input en coordonnées lat et lng
  // DEPART
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
        setDeparture(position);
        setDepartureName(details.structured_formatting.main_text)
      }
    } catch (error) {
      console.error("Erreur lors de la récupération de la position:", error);
    }
  };
    // POINTS DE PASSAGE
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
  // ARRIVAL
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
        setArrival(position);
        setArrivalName(details.structured_formatting.main_text)
      }
    } catch (error) {
      console.error("Erreur lors de la récupération de la position:", error);
    }
  };
//Ligne de l'itinéraire
  const itinerayLineOnReady = (args) => {
    if (args) {
      setDistance(args.distance);
      setDuration(args.duration);
    }
  };

  // marker points de passage
  const wayPoints = wayPoint.map((waypoint, index) => (
    <Marker
      key={index}
      coordinate={waypoint}
      title={wayPointName[index]}
      pinColor="#8B9EAB"
    />
  ));

  // handle capture d'écran
  const ref = useRef()

  // swipe up when click ok to continue 
  const swipeUpDownRef = useRef();

  const handleSaveitinerary = () => {
    // Capture d'écran
    captureRef(ref, {
      format: "jpg",
      quality: 0.8,
    }).then(
      (uri) => {
        // création d'un objet qui va être dispatch dans le store puis dans la db
      const itinerary = {
        departure: departure,
        departureName: departureName,
        waypoints: wayPoint,
        waypointsName: wayPointName,
        arrival: arrival,
        arrivalName: arrivalName,
        time: duration,
        itineraryImg: uri
      }
      
      dispatch(addItineraryFirstPart(itinerary))
    },
      (error) => console.error("Oops, snapshot failed", error)
    );
    swipeUpDownRef.current.showFull();
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={ref}
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
            apikey='AIzaSyAYavTHYiwXdCbZQCvC5hIJ8_sE-T5ETII'
            strokeColor="#F94A56"
            strokeWidth={5}
            onReady={itinerayLineOnReady}
            onError={(error) => console.log("routing error", error)}
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
              key: 'AIzaSyAYavTHYiwXdCbZQCvC5hIJ8_sE-T5ETII',
              language: "fr",
            }}
          />
          <GooglePlacesAutocomplete
            style={[styles.input]}
            placeholder="Point de passage"
            onPress={addWayPoint}
            query={{
              key: 'AIzaSyAYavTHYiwXdCbZQCvC5hIJ8_sE-T5ETII',
              language: "fr",
            }}
          />
          <GooglePlacesAutocomplete
            style={[styles.input]}
            placeholder="Arrivée"
            onPress={addArrival}
            query={{
              key: 'AIzaSyAYavTHYiwXdCbZQCvC5hIJ8_sE-T5ETII',
              language: "fr",
            }}
          />
          {distance && duration ? (
            <View>
              <View style={styles.validationContainer}> 
                <View  style={styles.distance}>
                  <Text>Distance: {distance.toFixed(2)} km</Text>
                </View>
                <View  style={styles.time}>
                  <Text>
                    Temps: {Math.ceil(duration)} {duration > 1440 && "j"}
                    {duration >= 60 && duration < 1440 && "h"}
                    {duration < 60 && "min"}
                  </Text>
                </View>
                  <TouchableOpacity activeOpacity={-1} style={styles.validationButton} onPress={() => handleSaveitinerary()}>
                    <Text style={styles.textOK}>OK</Text>
                  </TouchableOpacity>
              </View>
            </View>
          ) : null}
        </View>
      </View>

      <SwipeUpDown
        itemFull={() => <SwipeItemFull />}
        ref={swipeUpDownRef}
        animation="spring"
        disableSwipeIcon={true}
        extraMarginTop={100}
        swipeHeight={150}
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
    backgroundColor: 'white',
  },
  map: {
    width: Dimensions.get("window").width,
    height: '98%',
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
    backgroundColor: "#FFFFFF",
    // height: 800,
  },
  validationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  distance: {
    backgroundColor: '#EDEDED',
    width: '45%',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  time: {
    backgroundColor: '#EDEDED',
    width: '30%',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,   
  },
  textOK: {
    color: 'white'
  },
  validationButton: {
    backgroundColor: '#213A5C',
    width: 50,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  swipeUpToContinue: {
    fontSize: 18,
    color: 'white',
  },
  swipeUp: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#213A5C',
    marginTop: 10,
    borderRadius: 20,
    height: 35,
  },
});