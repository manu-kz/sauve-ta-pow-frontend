import {
    StyleSheet,
    Text,
    View,
    Image,
  } from 'react-native';
  import { useDispatch, useSelector } from 'react-redux';
  import { useEffect } from 'react';
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
  
    //fonction pour obtenir l'icone météo actuelle à partir du composant weatherIcons
    const currentWeatherIcon = selectWeatherIcon(meteo.weatherIcon);
  
    // 1 obtenir la localisation de l'utilisateur
  
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
          });
      }
    }, []);
  
    // 2 fetch current météo
  
    //ajout de la current météo au store pour réutilisation dans le dashboard
    // on réutilise la locationKey qu'on met en params pour avoir la météo locale
    useEffect(() => {
      fetch(`http://10.0.2.110:3000/meteo/locationKey/${user.locationKey}`)
        .then((response) => response.json())
        .then((data) => {
          // dispatch meteo dans le store
          data &&
            dispatch(
              addLocalWeather({
                weatherIcon: data.meteo[0].WeatherIcon,
                weatherText: data.meteo[0].WeatherText,
                temperature: Math.round(data.meteo[0].Temperature.Metric.Value),
              })
            );
        });
      // refresh à chaque changement de locationKey pour avoir toujours la météo locale
    }, [user.locationKey]);
  
  
    return (
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
                        <Text style={styles.weatherInfo}>
                          {meteo.weatherText}
                        </Text>
                      </View>
                      <View style={styles.temperatureContainer}>
                        <Text style={styles.temperature}>
                          {meteo.temperature}°C
                        </Text>
                      </View>
                    </View>
                  )}
                </LinearGradient>
              </BlurView>
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
  });
  