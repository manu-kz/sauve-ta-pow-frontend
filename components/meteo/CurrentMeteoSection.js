import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { keepLocation, keepLocationInfo } from '../../reducers/user';
import { addLocalWeather } from '../../reducers/meteo';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import selectWeatherIcon from './WeatherIcons';

export default function MeteoScreen() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const meteo = useSelector((state) => state.meteo);

  const [hourlyWeatherData, setHourlyWeatherData] = useState([]);
  const [dailyWeatherData, setDailyWeatherData] = useState([]);

  //fonction pour obtenir l'icone météo actuelle à partir du composant weatherIcons
  const currentWeatherIcon = selectWeatherIcon(meteo.weatherIcon);

  // GET météo actuelle selon la location Key fournie par l'API. Fonction appelée dans le useEffect
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

  // GET météo 12 prochaines heures selon la location Key fournie par l'API. Fonction appelée dans le useEffect
  async function getHourlyMeteo(locationID) {
    const rawResponse = await fetch(
      `http://10.0.2.110:3000/meteo/hourly/${locationID}`
    );
    const responseJSON = await rawResponse.json();
    const newMeteoData = responseJSON.meteo.map((data) => {
      return {
        DateTime: data.DateTime,
        WeatherIcon: data.WeatherIcon,
        temperatureValue: Math.round(data.Temperature.Value),
      };
    });
    setHourlyWeatherData([...newMeteoData]);
  }

  //map pour affichage de chaque heure
  const hourlyWeather = hourlyWeatherData.map((data, i) => {
    const hourlyweatherIcon = selectWeatherIcon(data.WeatherIcon);
    const hours = data.DateTime.slice(11, 13);

    return (
      <View key={i} style={styles.hourlyContainer}>
        <Image style={styles.hourlyIcon} source={hourlyweatherIcon} />
        <View>
          <Text style={styles.hourlyTextHour}>{hours}h</Text>
          <Text style={styles.hourlyTextTemperature}>
            {data.temperatureValue}°C
          </Text>
        </View>
      </View>
    );
  });

  // GET météo 5 prochains jours selon la location Key fournie par l'API. Fonction appelée dans le useEffect
  async function getDailyMeteo(locationID) {
    const rawResponse = await fetch(
      `http://10.0.2.110:3000/meteo/daily/${locationID}`
    );
    const responseJSON = await rawResponse.json();
    const newMeteoData = responseJSON.meteo.map((data) => {
      const dayOfWeek = new Date(data.Date)
        .toLocaleString('fr-fr', { weekday: 'long' })
        .slice(0, -20);

      return {
        WeatherIcon: data.Day.Icon,
        weekDay: dayOfWeek,
        temperatureMin: Math.round(data.Temperature.Minimum.Value),
        temperatureMax: Math.round(data.Temperature.Maximum.Value),
      };
    });
    setDailyWeatherData([...newMeteoData]);
  }

  //map pour affichage de chaque jour
  const dailylyWeather = dailyWeatherData.map((data, i) => {
    const dailyweatherIcon = selectWeatherIcon(data.WeatherIcon);
    const today = new Date()
      .toLocaleString('fr-fr', { weekday: 'long' })
      .slice(0, -20);

    return (
      <View key={i} style={styles.dailyContainer}>
        <View style={styles.dailySubContainerLeft}>
          <Image style={styles.dailyIcon} source={dailyweatherIcon} />
          {/* pour le jour qui correspond à aujourd'hui, afficher "aujourd'hui" */}
          {today === data.weekDay && (
            <Text style={styles.dailyTextDay}>aujourd'hui</Text>
          )}
          {today !== data.weekDay && (
            <Text style={styles.dailyTextDay}>{data.weekDay}</Text>
          )}
        </View>
        <View style={styles.dailySubContainerRight}>
          <Text style={styles.dailyTextTemperature}>
            {data.temperatureMin}°C
          </Text>
          <Text style={styles.dailyTextTemperature}>
            {data.temperatureMax}°C
          </Text>
        </View>
      </View>
    );
  });

  // obtenir la localisation de l'utilisateur

  // Permission d'utiliser la localisation de l'appareil, puis utilisation de la localisation.
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      // si on a l'autorisation on ajoute ses coordonnées GPS dans le store persistent
      //interval de 1000m pour la météo
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
    // si on a une location dans le store on fetch l'API pour récupérer la locationKey et le nom de la ville
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
          // appel des 3 fontions GET
          getCurrentMeteo(data.location.Key);
          getHourlyMeteo(data.location.Key);
          getDailyMeteo(data.location.Key);
        });
    }
  }, [user.location]);

  //pour le moment on copie colle ce code dans le dashboard pour afficher la current meteo, mais à terme on optimisera en récupérant les données depuis ce composant

  return (
    <>
      <BlurView intensity={30} style={styles.mainCardContainer}>
        <LinearGradient
          colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.2)']}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
          useAngle
          angle={110}
          style={styles.card}
        >
          <View style={styles.weatherCardTop}>
            <Image style={styles.meteoIcon} source={currentWeatherIcon} />
          </View>
          {!user.locationKey && (
            <Text style={styles.weatherInfo}>Pas de connexion</Text>
          )}
          {user.locationKey && (
            <View style={styles.weatherCardBottom}>
              <View>
                <Text style={styles.cityInfo}>{user.locationName}</Text>
                <Text style={styles.weatherInfo}>{meteo.weatherText}</Text>
              </View>
              <View style={styles.temperatureContainer}>
                <Text style={styles.temperature}>{meteo.temperature}°C</Text>
              </View>
            </View>
          )}
        </LinearGradient>
      </BlurView>
      <BlurView intensity={30} style={styles.hourlyCardContainer}>
        <LinearGradient
          colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.2)']}
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
            <View style={styles.hourlyCardBottom}>
              {hourlyWeather}
              </View>
          </ScrollView>
        </LinearGradient>
      </BlurView>
      <BlurView intensity={30} style={styles.dailyCardContainer}>
        <LinearGradient
          colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.2)']}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
          useAngle
          angle={110}
          style={styles.card}
        >
          <View style={styles.dailyCardTop}>
            <Text style={styles.dailyTitle}>5 prochains jours</Text>
          </View>
          <View style={styles.dailyCardBottom}>
            <View style={styles.minMaxContainer}>
              <View style={styles.tempBar}></View>
              <View style={styles.tempBar}>
                <Text style={styles.dailyTextTempLabel}>min</Text>
                <Text style={styles.dailyTextTempLabel}>max</Text>
              </View>
            </View>
            {dailylyWeather}
          </View>
        </LinearGradient>
      </BlurView>
    </>
  );
}

const styles = StyleSheet.create({
  mainCardContainer: {
    width: 182,
    height: 156,
    marginBottom: 20,
    borderRadius: 20,
  },
  card: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
    borderRadius: 20,
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
  card: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
    borderRadius: 20,
  },
  hourlyCardContainer: {
    width: 328,
    height: 106,
    marginBottom: 20,
    borderRadius: 20,
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
  dailyCardContainer: {
    width: 328,
    height: 280,
    marginBottom: 20,
    borderRadius: 20,
  },
  dailyTitle: {
    width: '100%',
    color: '#fff',
    fontWeight: 600,
    fontSize: 20,
  },
  dailyCardTop: {
    margin: 5,
    width: '100%',
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderColor: '#fff',
  },
  dailyCardBottom: {
    width: '100%',
  },
  dailyContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomWidth: 0.5,
    borderBottomColor: '#fff',
    padding: 6,
  },
  minMaxContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  tempBar: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    paddingLeft: 30,
  },
  dailySubContainerLeft: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  dailySubContainerRight: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingLeft: 30,
  },
  dailyIcon: {
    height: 30,
    width: 30,
    marginRight: 3,
  },
  dailyTextDay: {
    color: '#fff',
    fontWeight: 600,
    marginLeft: '10%',
  },
  dailyTextTempLabel: {
    color: '#fff',
    fontSize: 10,
  },
  dailyTextTemperature: {
    color: '#fff',
  },
});
