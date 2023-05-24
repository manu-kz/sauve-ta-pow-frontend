import React, { useState } from 'react';

import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Pressable,
} from 'react-native';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './screens/HomeScreen';
import MeteoScreen from './screens/MeteoScreen';
import ItinerariesScreen from './screens/ItinerariesScreen';
import UiKitScreen from './screens/UiKitScreen';
import LoginScreen from './screens/LoginScreen';
// NEWS SCREEN
import NewsScreen from './screens/NewsScreen';
import FavorisScreen from './screens/FavorisScreen';
import EntireArticleScreen from './screens/EntireArticleScreen';
import ArticlesScreen from './screens/ArticleScreen';
// USER SCREENS
import UserScreen from './screens/UserScreen';
import PersonalInfosScreen from './screens/PersonalInfoScreen';
import HealthInfoScreen from './screens/HealthInfoScreen';
import ItinerariesInfoScreen from './screens/ItinerariesInfoScreen';
import HelpInfoScreen from './screens/HelpInfoScreen';
import ConfidentialityInfoScreen from './screens/ConfidentialityInfoScreen';

//ITINERARY SCREENS
import EntireItineraryScreen from './screens/EntireItineraryScreen';
import ItineraryListScreen from './screens/ItineraryListScreen';
import SwipeItemFull from './components/SwipeItemFull';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

// persist store
//AsyncStorage.clear()
import { Provider } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import articles from './reducers/articles';
import user from './reducers/user';
import bookmarks from './reducers/bookmarks';
import modals from './reducers/modals';
import meteo from './reducers/meteo';
import itineraries from './reducers/itineraries';
import launchItinerary from './reducers/launchItinerary';
// import reducers

const reducers = combineReducers({
  articles,
  user,
  modals,
  meteo,
  bookmarks,
  itineraries,
  launchItinerary,
});
const persistConfig = {
  key: 'Sauve-ta-Pow',
  storage: AsyncStorage,
  blacklist: ['modals', 'meteo'],
};

// import reducers

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Stack navigation contenant les différentes pages à aficher pour la tab navigation NEWS
const NewsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Articles" component={NewsScreen} />
      <Stack.Screen name="Favoris" component={FavorisScreen} />
      <Stack.Screen name="Article" component={ArticlesScreen} />
      <Stack.Screen name="EntireArticle" component={EntireArticleScreen} />
    </Stack.Navigator>
  );
};

// Stack user contenant les différentes pages  à afficher pour la tab navigation USER
const UserStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="UserPage" component={UserScreen} />
      <Stack.Screen name="PersonnalInfo" component={PersonalInfosScreen} />
      <Stack.Screen name="HealthInfo" component={HealthInfoScreen} />
      <Stack.Screen name="ItinerariesInfo" component={ItinerariesInfoScreen} />
      <Stack.Screen name="HelpInfo" component={HelpInfoScreen} />
      <Stack.Screen
        name="ConfidentialityInfo"
        component={ConfidentialityInfoScreen}
      />
    </Stack.Navigator>
  );
};

// Stack Itinéraire contenant les différentes pages à afficher
const ItineraryStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ItinerariesList" component={ItineraryListScreen} />
      <Stack.Screen name="Itineraries" component={ItinerariesScreen} />
      <Stack.Screen name="SwipeItem" component={SwipeItemFull} />
      <Stack.Screen name="EntireItinerary" component={EntireItineraryScreen} />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  const token = useSelector((state) => state.user.token);
  const showLoginProcess = useSelector((state) => state.user.loginProcess);
  //console.log("token in storage ==>", token)
  //console.log('Is login process activated in storage ==>', showLoginProcess);

  //Fonctionnalité pour pouvoir appler dès l'appui sur le bouton phone
  const launchItinerary = useSelector((state) => state.launchItinerary.value);

  const [modalVisible, setModalVisible] = useState(false);
  const [call, setCall] = useState(false);

  const handleLaunchItinerary = () => {
    setCall(true);
    setModalVisible(true);
    console.log('OK');
  };

  let imageContainer = {
    height: 80,
    width: 80,
    borderRadius: 50,
    borderColor: '#fff',
    borderWidth: 10,
    backgroundColor: '#FFB703',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  };

  let imgUrl = require('./assets/picto_randonneur.png');
  //Changement de style pour le bouton randonneur -> phone
  if (launchItinerary) {
    imgUrl = require('./assets/picto_phone.png');
    imageContainer = {
      height: 80,
      width: 80,
      borderRadius: 50,
      borderColor: '#fff',
      borderWidth: 10,
      backgroundColor: '#F94A56',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 50,
    };
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size, style }) => {
          let iconName = '';
          if (route.name === 'News') {
            iconName = 'file-text';
            return (
              <Feather name={iconName} size={25} color={color} style={style} />
            );
          } else if (route.name === 'Meteo') {
            iconName = 'cloud-drizzle';
            return (
              <Feather name={iconName} size={25} color={color} style={style} />
            );
          } else if (route.name === 'Hike') {
            return (
              <View
                style={imageContainer}
              >
                <View style={styles.indicatorBefore} />
                <Image
                  source={imgUrl}
                  style={{
                    height: 40,
                    width: 40,
                  }}
                />
                <View style={styles.indicatorAfter} />
              </View>
            );
          } else if (route.name === 'User') {
            iconName = 'user';
            return (
              <Feather name={iconName} size={25} color={color} style={style} />
            );
          } else if (route.name === 'Home') {
            iconName = 'home';
            return (
              <Feather name={iconName} size={25} color={color} style={style} />
            );
          } else if (route.name === 'Login') {
            return (
              <View
                style={imageContainer}
              >
                <View style={styles.indicatorBefore} />
                <Image
                  source={imgUrl}
                  style={{
                    height: 40,
                    width: 40,
                  }}
                />
                <View style={styles.indicatorAfter} />
              </View>
            );
          }
        },
        tabBarStyle: {
          backgroundColor: '#213A5C',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingTop: 15,
          height: 80,
        },
        tabBarActiveTintColor: '#FFB703',
        tabBarInactiveTintColor: '#FFFFFF',
        headerShown: false,
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="News" component={NewsStack} />
      {!token || showLoginProcess ? (
        <Tab.Screen
          name="Login"
          component={LoginScreen}
          listeners={{
            tabPress: (e) => {
              handleLaunchItinerary();
            },
          }}
        />
      ) : (
        <Tab.Screen name="Hike" component={ItineraryStack} listeners={{
          tabPress:(e) => {
              if (token && !launchItinerary){
                handleLaunchItinerary()
              }
          }
        }} />
      )}
      <Tab.Screen name="Meteo" component={MeteoScreen} />
      <Tab.Screen name="User" component={UserStack} />
      <Tab.Screen name="Phone" component={EntireItineraryScreen} />
      {/*<Tab.Screen name="itineraryList" component={ItineraryListScreen} />*/}
      {/* <Tab.Screen name="UiKit" component={UiKitScreen} /> */}
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicatorBefore: {
    width: 22,
    height: 25,
    backgroundColor: '#213A5C',
    position: 'absolute',
    left: -32,
    top: 22.5,
    borderTopRightRadius: 20,
    shadowOffset: {
      width: 2,
      height: -15,
    },
    shadowColor: '#fff',
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  indicatorAfter: {
    width: 22,
    height: 25,
    backgroundColor: '#213A5C',
    position: 'absolute',
    left: 70,
    top: 22.5,
    borderTopLeftRadius: 20,
    shadowOffset: {
      width: -2,
      height: -15,
    },
    shadowColor: '#fff',
    shadowOpacity: 1,
    shadowRadius: 0,
  },
});
