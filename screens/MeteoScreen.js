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
import selectWeatherIcon from '../components/weatherIcons';

export default function MeteoScreen({ navigation }) {
  const dispatch = useDispatch();

  const [hourlyWeatherData, setHourlyWeatherData] = useState([]);


  const user = useSelector((state) => state.user);
  const meteo = useSelector((state) => state.meteo);

  const currentWeatherIcon = selectWeatherIcon(meteo.weatherIcon);


  // Permission d'utiliser la localisation de l'appareil, puis utilisation de la localisation.
  //interval de 1000m pour la météo
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === 'granted') {
        Location.watchPositionAsync({ distanceInterval: 1000 }, (location) => {
          dispatch(
            keepLocation(
              `${location.coords.latitude},${location.coords.longitude}`
            )
          );
        });
      }
    })();

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
        });
    }
  }, []);

  useEffect(() => {
    fetch(`http://10.0.2.110:3000/meteo/${user.locationKey}`)
      .then((response) => response.json())
      .then((data) => {
        // dispatch meteo dans le store
        data &&
          dispatch(
            addLocalWeather({
              weatherIcon: data.meteo[0].WeatherIcon,
              weatherText: data.meteo[0].WeatherText,
              temperature: data.meteo[0].Temperature.Metric.Value,
            })
          );
      });
  }, []);

  useEffect(() => {
    fetch(`http://10.0.2.110:3000/meteo/hourly/${user.locationKey}`)
      .then((response) => response.json())
      .then((fetchdata) => {
        // push données meteo dans le useState currentMeteo
       // data &&
       const newMeteoData = fetchdata.meteo.map((data) => {
        return {
          WeatherIcon: data.WeatherIcon,
          temperatureValue: data.Temperature.Value,
          DateTime: data.DateTime,
        };
      });
      setHourlyWeatherData([...newMeteoData])
      });
  }, []);

  console.log('hourlyWeatherData', hourlyWeatherData)


  const hourlyWeather = hourlyWeatherData.map((data, i) => {
    const hourlyweatherIcon = selectWeatherIcon(data.WeatherIcon);
    const hours = data.DateTime.slice(11, 13)

    return (
      <View key={i} style={styles.hourlyContainer}>
        <Image style={styles.hourlyIcon} source={hourlyweatherIcon} />
        <View>
          <Text style={styles.hourlyTextHour}>{hours}h</Text>
          <Text style={styles.hourlyTextTemperature}>
            {data.TemperatureValue}°C
          </Text>
        </View>
      </View>
    );
  });

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../assets/mountain-background.jpeg')}
        style={styles.imgBackground}
      >
        <Text style={styles.h1}>Météo</Text>
        <View style={styles.contentContainer}>
          <BlurView intensity={30} style={styles.mainCardContainer}>
            <LinearGradient
              colors={['rgba(0,250,250,0.1)', 'rgba(0,250,250,0.2)']}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 1 }}
              useAngle
              angle={110}
              style={styles.card}
            >
              <View style={styles.weatherCardTop}>
                <Image style={styles.meteoIcon} source={currentWeatherIcon} />
              </View>
              {hourlyWeatherData.length===0 && <Text style={styles.weatherInfo}>Pas de connexion Internet</Text>}
              {hourlyWeatherData.length>0 && (<View style={styles.weatherCardBottom}>
                <View>
                  <Text style={styles.cityInfo}>{user.locationName}</Text>
                  <Text style={styles.weatherInfo}>{meteo.weatherText}</Text>
                </View>
                <View style={styles.temperatureContainer}>
                  <Text style={styles.temperature}>{meteo.temperature}°C</Text>
                </View>
              </View>)}
            </LinearGradient>
          </BlurView>
          <BlurView intensity={30} style={styles.hourlyCardContainer}>
            <LinearGradient
              colors={['rgba(0,250,250,0.1)', 'rgba(0,250,250,0.2)']}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 1 }}
              useAngle
              angle={110}
              style={styles.card}
            >
              <View style={styles.hourlyCardTop}>
                <Text style={styles.hourlyTitle}>Prévisions heure par heure</Text>
              </View>
              <ScrollView horizontal={true}>
                <View style={styles.hourlyCardBottom}>{hourlyWeather}</View>
              </ScrollView>
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
    height: '95%',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft:20,
    marginBottom:20
  },
  contentContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  mainCardContainer: {
    width: 182,
    height: 156,
    marginBottom: 20,
  },
  card: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
  },
  weatherCardTop: {
    margin: 5,
  },
  meteoIcon: {
    height: 80,
    width: 80,
  },
  weatherCardBottom: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
  },
  cityInfo: {
    fontSize: 25,
    fontWeight: 700,
    color: '#fff',
  },
  weatherInfo: {
    fontSize: 15,
    color: '#fff',
  },
  temperatureContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
    borderRadius: 100,
    backgroundColor: '#fff',
  },
  temperature: {
    fontSize: 12,
    color: '#000',
  },
  hourlyCardContainer: {
    width: 328,
    height: 106,
    marginBottom: 20,
  },
  hourlyCardTop: {
    margin: 5,
    width: '100%',
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderColor: '#fff',
  },
  hourlyTitle: {
    width: '100%',
    color: '#fff',
    fontWeight: 600,
    fontSize: 20,
  },
  hourlyCardBottom: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  hourlyContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  hourlyIcon: {
    height: 30,
    width: 30,
    marginRight: 3,
  },
  hourlyTextHour: {
    color: '#fff',
    fontWeight: 900,
  },
  hourlyTextTemperature: {
    color: '#fff',
  },
});
