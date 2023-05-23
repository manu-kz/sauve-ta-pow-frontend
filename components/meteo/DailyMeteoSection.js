import {
    StyleSheet,
    Text,
    View,
    Image,
  } from 'react-native';
  import { useSelector } from 'react-redux';
  import { useEffect, useState } from 'react';
  import { BlurView } from 'expo-blur';
  import { LinearGradient } from 'expo-linear-gradient';
  import selectWeatherIcon from './WeatherIcons';
  
  
  export default function DailyMeteoSection() {
    
    const [dailyWeatherData, setDailyWeatherData] = useState([]);
  
  
    const user = useSelector((state) => state.user);
  
    // 4 fetch météo 5 prochains jours
  
    //ajout des prévisions météo jour par jour dans un usestate dailyWeatherData
  
    useEffect(() => {
      fetch(`http://10.0.2.110:3000/meteo/daily/${user.locationKey}`)
        .then((response) => response.json())
        .then((fetchdata) => {
          // push données meteo dans le useState currentMeteo
          if (fetchdata) {
            const newMeteoData = fetchdata.meteo.map((data) => {
              const dayOfWeek = new Date(data.Date)
                .toLocaleString('fr-fr', { weekday: 'long' })
                .slice(0, -21);
  
              return {
                WeatherIcon: data.Day.Icon,
                weekDay: dayOfWeek,
                temperatureMin: Math.round(data.Temperature.Minimum.Value),
                temperatureMax: Math.round(data.Temperature.Maximum.Value),
              };
            });
            setDailyWeatherData([...newMeteoData]);
          }
        });
      // refresh à chaque changement de locationKey
    }, [user.locationKey]);
  
    // map sur le usestate pour afficher la météo des 5 prochains jours
    const dailylyWeather = dailyWeatherData.map((data, i) => {
      const dailyweatherIcon = selectWeatherIcon(data.WeatherIcon);
      const today = new Date()
        .toLocaleString('fr-fr', { weekday: 'long' })
        .slice(0, -21);
  
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
  
  
    return (
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
    );
  }
  
  const styles = StyleSheet.create({
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
  