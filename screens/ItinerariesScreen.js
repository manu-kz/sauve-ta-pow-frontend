import React, { useEffect, useState } from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Dimensions } from "react-native";
import * as Location from "expo-location";
import Constants from "expo-constants";
import MapViewDirections from "react-native-maps-directions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import SwipeUpDown from "react-native-swipe-up-down";
import SwipeItemMini from "../components/SwipeItemMini";
import SwipeItemFull from "../components/SwipeItemFull";

import { addItineraryFirstPart } from "../reducers/itineraries";
import { useDispatch, useSelector } from "react-redux";


export default function App() {

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
          //console.log('LOCATION', location.coords);
          setCurrentPosition(location.coords);
        });
      }
    })();
  }, []);

  //Utilisation de geocode pour convertir la valeur de l'input en coordonnées lat et lng
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
        console.log("Place:", placeId);
        setDeparture(position);
        setDepartureName(details.structured_formatting.main_text)
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
        setArrivalName(details.structured_formatting.main_text)
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


  const wayPoints = wayPoint.map((waypoint, index) => (
    <Marker
      key={index}
      coordinate={waypoint}
      title={wayPointName[index]}
      pinColor="#8B9EAB"
    />
  ));
  let swipe 

  // save les infos itinéraires dans le reducer
  const [ dispatchOk, setDispatchOk ] = useState(false)
  const handleSaveitinerary = () => {
    const itinerary = {
      departure: departure,
      departureName: departureName,
      waypoints: wayPoint,
      waypointsName: wayPointName,
      arrival: arrival,
      arrivalName: arrivalName,
      time: duration,
    }
    
    dispatch(addItineraryFirstPart(itinerary))
    setDispatchOk(true)
  }
  const itineraries = useSelector((state) => state.itineraries.value)

  // swipe up when click ok to continue 
  const [ swipeOk, setSwipeOk ] = useState(false)


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
              <View style={styles.validationContainer}> 
                <Text>Distance: {distance.toFixed(2)} km</Text>
                <Text>
                  Temps: {Math.ceil(duration)} {duration > 1440 && "j"}
                  {duration >= 60 && duration < 1440 && "h"}
                  {duration < 60 && "min"}
                </Text>
                {/* <View > */}
                  <TouchableOpacity activeOpacity={-1} style={styles.validationButton} onPress={() => handleSaveitinerary()}>
                    <Text style={styles.textOK}>OK</Text>
                  </TouchableOpacity>
                {/* </View> */}
              </View>
              <View style={styles.swipeUp}>
                {dispatchOk && <Text style={styles.swipeUpToContinue}>Swipe Up pour continuer ton itinéraire</Text>}
              </View>
            </View>
          ) : null}
        </View>
      </View>

      <SwipeUpDown
        itemMini={() => <SwipeItemMini />}
        itemFull={() => <SwipeItemFull />}
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
    backgroundColor: "#FFFFFF",
    // height: 800,
  },
  validationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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

// TAKE SCREEN SHOT 

// import React, {useRef} from 'react';
// import {StyleSheet, Text, View, Button} from 'react-native';
// import ViewShot from 'react-native-view-shot';
// import CameraRoll from '@react-native-community/cameraroll';
// const SomeComponent =() => {
//   const ref = useRef();
//   const takeScreenShot = () => {
//     ref.current.capture().then(uri => {
//       CameraRoll.save(uri,{type:"photo",album:"QR codes"});
//       alert("Took screenshot");
//     });
//   };
//   return (
//     <View style={styles.container}>
//       <ViewShot
//         ref={ref}
//         options={{
//         fileName: 'file-name', // screenshot image name
//         format: 'jpg', // image extention
//         quality: 0.9 // image quality
//         }} >
//         <Text> Some awesome content</Text>
//       </ViewShot>
//       <Button title="Share QR Code" onPress={takeScreenShot}/>
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     flex:1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#171821',
//   }
// });