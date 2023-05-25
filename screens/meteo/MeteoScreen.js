import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  Platform,
  StatusBar,
} from 'react-native';
import BraSection from '../../components/meteo/BraSection';
import CurrentMeteoSection from '../../components/meteo/CurrentMeteoSection';

export default function MeteoScreen() {

  return (
    <>
      <ScrollView>
        <ImageBackground
          source={require('../../assets/mountain-background.jpeg')}
          style={styles.imgBackground}
          resizeMode="cover"
        >
          <SafeAreaView style={styles.container}>
          <Text style={styles.h1}>Météo</Text>
          <View style={styles.contentContainer}>
            <CurrentMeteoSection />
          </View>
          </SafeAreaView>
        </ImageBackground>
        <BraSection />
      </ScrollView>
      <View style={styles.whiteRectangle}>
      </View>
      </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  whiteRectangle: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: 15,
  }
});
