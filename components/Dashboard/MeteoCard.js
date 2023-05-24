import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
//METEO IMPORT
import * as Location from "expo-location";
import { addLocalWeather } from "../../reducers/meteo";
import { keepLocation, keepLocationInfo } from "../../reducers/user";
import selectWeatherIcon from "../meteo/WeatherIcons";

export default function MeteoCard() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const meteo = useSelector((state) => state.meteo);
  const user = useSelector((state) => state.user);

  // LOCALISATION PERMISSION
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        Location.watchPositionAsync({ distanceInterval: 1000 }, (location) => {
          dispatch(
            keepLocation(
              `${location.coords.latitude},${location.coords.longitude}`
            )
          );
        });
      }
    })();
    // FETCH LOCATION KEY POUR METEO
    if (user.location) {
      fetch(`http://10.0.2.110:3000/meteo/location/${user.location}`)
        .then((response) => response.json())
        .then((data) => {
          data &&
            dispatch(
              keepLocationInfo({
                locationName: data.location.LocalizedName,
                locationKey: data.location.Key,
              })
            );
          getCurrentMeteo(data.location.Key);
        });
    }
  }, [user.location]);

  //RÉCUPÉRATION CURRENT METEO
  async function getCurrentMeteo(locationID) {
    const rawResponse = await fetch(
      `http://10.0.2.110:3000/meteo/current/${locationID}`
    );
    const responseJSON = await rawResponse.json();
    responseJSON &&
      dispatch(
        addLocalWeather({
          weatherIcon: responseJSON.meteo[0].WeatherIcon,
          weatherText: responseJSON.meteo[0].WeatherText,
          temperature: Math.round(
            responseJSON.meteo[0].Temperature.Metric.Value
          ),
        })
      );
  }

  //RÉCUPÉRER LE BON ICON METEO
  const currentWeatherIcon = selectWeatherIcon(meteo.weatherIcon);


   //NAVIGATION TO METEO
   const handleMeteoNavigation = () => {
    navigation.navigate("Meteo");
  };

  return (
    
    <BlurView intensity={30} style={styles.weatherBlur} >
      <LinearGradient
        colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.2)"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
        useAngle
        angle={110}
        style={styles.card}
        
      >
        <Pressable  onPress={() => handleMeteoNavigation()}>
        <Image style={styles.meteoIcon} source={currentWeatherIcon}/>

        {!user.locationKey && (
          <Text style={styles.weatherError}>Pas de connexion</Text>
        )}
        {user.locationKey && (
          <View style={styles.weather} >
            <View >
              <Text style={styles.cityInfo }>{user.locationName}</Text>
              <Text style={styles.weatherInfo}>{meteo.weatherText}</Text>
            </View>
            <View style={styles.temperatureContainer}>
              <Text style={styles.temperature}>{meteo.temperature}°C</Text>
            </View>
          </View>
        )}
        </Pressable>
      </LinearGradient>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  //CARD BLUR

  card: {
    borderRadius: 30,
    height: "100%",
    width: "100%",
    justifyContent: "space-evenly",
  },
  weatherBlur: {
    width: "45%",
    height: 150,
    marginBottom: 50,
  },

  //WEATHER DATA

  meteoIcon: {
    height: 70,
    width: 70,
    alignSelf: "center",
  },
  weather: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingBottom: 10,
  },
  cityInfo: {
    fontSize: 25,
    fontWeight: 700,
    color: "#fff",
  },
  weatherInfo: {
    fontSize: 15,
    color: "#fff",
  },
  weatherError:{
    textAlign:'center',
    fontSize: 15,
    color: "#fff",
  },
  temperatureContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 40,
    borderRadius: 100,
    backgroundColor: "#fff",
  },
  temperature: {
    fontSize: 12,
    color: "#000",
  },
});
