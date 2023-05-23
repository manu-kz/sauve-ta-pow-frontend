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
import selectWeatherIcon from '../components/meteo/WeatherIcons';
import BraSection from '../components/meteo/BraSection';
import HourlyMeteoSection from '../components/meteo/HourlyMeteoSection';
import DailylyMeteoSection from '../components/meteo/DailyMeteoSection';
import CurrentMeteoSection from '../components/meteo/CurrentMeteoSection';

export default function MeteoScreen() {
  const [height, setHeight] = useState(0);

  // définition de la hauteur de ImageBackground pour placer l'input
  const onLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    setHeight(height);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <ImageBackground
          source={require('../assets/mountain-background.jpeg')}
          style={styles.imgBackground}
          resizeMode="cover"
          onLayout={onLayout}
        >
          <Text style={styles.h1}>Météo</Text>
          <View style={styles.contentContainer}>
            <CurrentMeteoSection />
            <HourlyMeteoSection />
            <DailylyMeteoSection />
          </View>
          <View style={{ ...styles.inputView, top: height }}>
            <TextInput
              style={styles.input}
              placeholder="Rechercher un massif"
            />
          </View>
        </ImageBackground>
        <BraSection />
      </ScrollView>
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
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingBottom: 30,
  },
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 20,
    marginBottom: 20,
  },
  contentContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  inputView: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 273,
    height: 34,
    backgroundColor: '#fff',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#8B9EAB',
    paddingLeft: 10,
    margin: 5,
  },
});
