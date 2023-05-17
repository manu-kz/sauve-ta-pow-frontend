import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
  Platform,
  StatusBar,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { keepLocation, keepLocationInfo } from '../reducers/user';
import { addLocalWeather } from '../reducers/meteo';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

export default function MeteoScreen({ navigation }) {
  // const dispatch = useDispatch();

  // const user = useSelector((state) => state.user);
  // const meteo = useSelector((state) => state.meteo);

  // // Permission d'utiliser la localisation de l'appareil, puis utilisation de la localisation.
  // //interval de 1000m pour la météo
  // useEffect(() => {
  //   (async () => {
  //     const { status } = await Location.requestForegroundPermissionsAsync();

  //     if (status === 'granted') {
  //       Location.watchPositionAsync({ distanceInterval: 1000 }, (location) => {
  //         setCurrentPosition(location.coords);
  //         dispatch(
  //           keepLocation(
  //             `${location.coords.latitude},${location.coords.longitude}`
  //           )
  //         );
  //       });
  //     }
  //   })();

  //   if (user.location) {
  //     fetch(`http://10.0.2.110:3000/meteo/location/${user.location}`)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         //console.log('meteoscreen locationkey',data.location.Key)
  //         //data && dispatch(keepLocationKey(data.location.Key));
  //         data &&
  //           dispatch(
  //             keepLocationInfo({
  //               locationName: data.location.LocalizedName,
  //               locationKey: data.location.Key,
  //             })
  //           );
  //       });
  //   }
  // }, []);

  // useEffect(() => {
  //   fetch(`http://10.0.2.110:3000/meteo/${user.locationKey}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // dispatch meteo dans le store
  //       data &&
  //         dispatch(
  //           addLocalWeather({
  //             weatherIcon: data.meteo[0].WeatherIcon,
  //             weatherText: data.meteo[0].WeatherText,
  //             temperature: data.meteo[0].Temperature.Metric.Value,
  //           })
  //         );
  //     });
  // }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../assets/mountain-background.jpeg')}
        style={styles.imgBackground}
      >
        <Text style={styles.h1}>Météo</Text>

        {/* <Text style={styles.title}>Meteo</Text>
          <Text style={styles.title}>{user.locationName}</Text>
          <Text style={styles.title}>{meteo.weatherIcon}</Text>
          <Text style={styles.title}>{meteo.weatherText}</Text>
          <Text style={styles.title}>{meteo.temperature}°C</Text> */}
        <View style={styles.contentContainer}>
          <BlurView intensity={30} style={styles.cardContainer}>
            <LinearGradient
              colors={['rgba(0,250,250,0.1)', 'rgba(0,250,250,0.2)']}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 1 }}
              useAngle
              angle={110}
              style={styles.card}
            >
              <View style={styles.weatherCardTop}>
              <Text style={styles.weatherIcon}>1</Text>
              </View>
              <View style={styles.weatherCardBottom}>
                <View style={styles.cityInfo}>
              <Text style={styles.title}>Lyon</Text>
              <Text style={styles.title}>Sunny</Text>
              </View>
              <Text style={styles.title}>15°C</Text>
              </View>
            </LinearGradient>
          </BlurView>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imgBackground: {
    width: '100%',
    height: '80%',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
    color:'#fff'
  },
  contentContainer:{
    display: 'flex',
    alignItems: 'center',
  },
  cardContainer: {
    width: 182,
    height: 156,
  },
  card: {
    height: '100%',
    width: '100%',
    display:'flex',
    alignItems:'center',
    justifyContent:'space-between'
  },
  weatherCardTop: {

  },
  weatherCardBottom: {
    display:'flex',
    flexDirection:'row',
    alignItems:'space-between',
    justifyContent:'space-between'
  },
});
