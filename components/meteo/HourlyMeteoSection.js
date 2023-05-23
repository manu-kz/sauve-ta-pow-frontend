import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
  } from 'react-native';
  import { useSelector } from 'react-redux';
  import { useEffect, useState } from 'react';
  import { BlurView } from 'expo-blur';
  import { LinearGradient } from 'expo-linear-gradient';
  import selectWeatherIcon from './WeatherIcons';
  
  export default function HourlyMeteoSection() {
  
    const [hourlyWeatherData, setHourlyWeatherData] = useState([]);
    
    const user = useSelector((state) => state.user);
  
    // 3 fetch météo heure par heure
  
    //ajout des prévisions météo heure par heure dans un usestate HourlyWeatherData
  
    useEffect(() => {
      fetch(`http://10.0.2.110:3000/meteo/hourly/${user.locationKey}`)
        .then((response) => response.json())
        .then((fetchdata) => {
          // push données meteo dans le useState currentMeteo
          if (fetchdata) {
            const newMeteoData = fetchdata.meteo.map((data) => {
              return {
                DateTime: data.DateTime,
                WeatherIcon: data.WeatherIcon,
                temperatureValue: Math.round(data.Temperature.Value),
              };
            });
            setHourlyWeatherData([...newMeteoData]);
          }
        });
      // refresh à chaque changement de locationKey
    }, [user.locationKey]);
  
    // map sur le usestate pour afficher la météo des 12 prochaines heures
  
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
  

  
    return (
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
                    <Text style={styles.hourlyTitle}>
                      Prévisions heure par heure
                    </Text>
                  </View>
                  <ScrollView horizontal={true}>
                    <View style={styles.hourlyCardBottom}>{hourlyWeather}</View>
                  </ScrollView>
                </LinearGradient>
              </BlurView>
    );
  }
  
  const styles = StyleSheet.create({
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
  });
  