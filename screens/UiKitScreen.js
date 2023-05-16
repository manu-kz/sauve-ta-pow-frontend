import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity,Image, ImageBackground, SafeAreaView, TextInput } from 'react-native';
import { BlurView } from 'expo-blur';
import {LinearGradient} from 'expo-linear-gradient';


export default function UiKitScreen() {

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('../assets/mountain-background.jpeg')} style={{width: '100%', height: '100%', display:'flex', paddingTop:70, alignItems: 'center'}}>
      <ScrollView style={styles.scrollView}>

      
      <Text style={styles.title}>GLASSMORPHISM</Text>

      <View style={styles.contentContainer}>
          <BlurView
            intensity={30}  style={styles.cardContainer}>
            <LinearGradient
              colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.2)']}
              start={{x: 0, y: 1}}
              end={{x: 1, y: 1}}
              useAngle
              angle={110}
              style={styles.card}
            />
          </BlurView>
      </View>
      
      <Text style={styles.title}>BUTTONS</Text>

      <TouchableOpacity style={styles.buttonLong} activeOpacity={0.8}>
        <Text style={styles.textButtonWhite}>Long Button</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.buttonShortGrey} activeOpacity={0.8}>
        <Text style={styles.textButtonWhite}>Short button</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonShortWhite} activeOpacity={0.8}>
        <Text style={styles.textButtonGrey}>Short button</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonShortYellow} activeOpacity={0.8}>
        <Text style={styles.textButtonWhite}>Short button</Text>
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.8} style={styles.buttonCircleYellow}>
        <Image source={require('../assets/picto_randonneur.png')} style={styles.icon}/>
      </TouchableOpacity>

      <View style={styles.buttonBigWhite} activeOpacity={0.8}>
      <TouchableOpacity activeOpacity={0.8}style={styles.buttonCircleGrey}>
      <Image source={require('../assets/Cross.png')} style={styles.icon}/>
      </TouchableOpacity>
        <Text style={styles.textButtonGrey}>Ajouter itinéraire</Text>
      </View>

      <TouchableOpacity activeOpacity={0.8} style={styles.buttonCircleGreen}>
        <Image source={require('../assets/haut-parleur-fort.png')} style={styles.icon}/>
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.8} style={styles.buttonCircleRed}>
        <Image source={require('../assets/fin-dappel.png')} style={styles.icon}/>
      </TouchableOpacity>


      <Text style={styles.title}>FORM</Text>

      <TextInput
        style={styles.input}
        placeholder="Lastname"
      />

      </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView:{
    height: '100%',
    width: '100%',
    display:'flex',
  },
  title:{
    color:'#fff',
    fontSize:20,
    textAlign:'center'
  },
  image: {
    resizeMode: 'contain',
    width: '100%',
  },
  cardContainer: {
    width: 350,
    height: 200,
  },
  card: {
    height: '100%',
    width: '100%',
  },
  buttonLong: {
    width: 273,
    height: 34,
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8B9EAB',
    borderRadius: 100,
    margin:5
  },
  buttonShortGrey: {
    width: 143,
    height: 43,
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8B9EAB',
    borderRadius: 100,
    margin:5
  },
  buttonShortWhite: {
    width: 143,
    height: 43,
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth:1,
    borderRadius: 100,
    margin:5
  },
  buttonShortYellow: {
    width: 143,
    height: 43,
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFB703',
    borderRadius: 100,
    margin:5
  },
  textButtonWhite: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize:16
  },
  textButtonGrey: {
    color: '#8B9EAB',
    fontWeight: '700',
    fontSize:16
  },
  buttonCircleYellow: {
    width: 50,
    height: 50,
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFB703',
    borderRadius: 100,
    padding:2,
    margin:5
  },
  buttonCircleRed: {
    width: 70,
    height: 70,
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F94A56',
    borderRadius: 100,
    padding:10,
    margin:5
  },
  buttonCircleGreen: {
    width: 70,
    height: 70,
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#52BD8F',
    borderRadius: 100,
    padding:18,
    margin:5
  },
  buttonBigWhite: {
    width: 280,
    height: 68,
    display:'flex',
    flexDirection:'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth:1,
    borderRadius: 100,
    paddingLeft: 5,
    paddingRight:10,
    margin:5
  },
  buttonCircleGrey: {
    width: 50,
    height: 50,
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8B9EAB',
    borderRadius: 100,
    padding:15,
    marginLeft:5,
    marginRight:'15%'
  },
  icon:{
    resizeMode: 'contain',
    width: '100%',
  },
  input: {
    width: 273,
    height: 34,
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 100,
    borderWidth:1,
    borderColor:'#8B9EAB',
    paddingLeft:10,
    margin:5
  },
});
