import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

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
import PersonalInfosScreen from './screens/PersonalInfoScreen'
import HealthInfoScreen from './screens/HealthInfoScreen';
import ItinerariesInfoScreen from './screens/ItinerariesInfoScreen';
import HelpInfoScreen from './screens/HelpInfoScreen';
import ConfidentialityInfoScreen from './screens/ConfidentialityInfoScreen';



import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

// persist store
//AsyncStorage.clear()
import { Provider } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import articles from "./reducers/articles";
import user from "./reducers/user";
import bookmarks from "./reducers/bookmarks";
import modals from "./reducers/modals";
import meteo from "./reducers/meteo";
import itineraries from "./reducers/itineraries";
// import reducers

const reducers = combineReducers({ articles, user, modals, meteo, bookmarks, itineraries });
const persistConfig = {
  key: "Sauve-ta-Pow",
  storage: AsyncStorage,
  blacklist: ["modals", "meteo"],
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
      <Stack.Screen name="ConfidentialityInfo" component={ConfidentialityInfoScreen} />
    </Stack.Navigator>
    )
}

const TabNavigator = () => {
  const token = useSelector((state) => state.user.token);
  const showLoginProcess = useSelector(state => state.modals.loginProcess)
  console.log('token, showLoginProcess', token, showLoginProcess)
  return (
    <Tab.Navigator 
    screenOptions={
      ({ route }) => (
        {
        tabBarIcon: ({ color, size, style }) => {
          let iconName = "";
          if (route.name === "News") {
            iconName = "file-text";
            return <Feather name={iconName} size={25} color={color} style={style}/>;
          } else if (route.name === "Meteo") {
            iconName = "cloud-drizzle";
            return <Feather name={iconName} size={25} color={color} style={style}/>;
          } else if (route.name === "Hike") {
            iconName = "navigation";
            return <Feather name={iconName} size={25} color={color} style={style}/>;
          } else if (route.name === "User") {
            iconName = "user";
            return <Feather name={iconName} size={25} color={color} style={style}/>;
          } else if (route.name === "Home") {
            iconName = "home";
            return <Feather name={iconName} size={25} color={color} style={style}/>;
          } else if (route.name === "Login") {
            return (
              <View style={{
                height: 80,
                width: 80,
                borderRadius: 50,
                borderColor: '#fff',
                borderWidth: 10,
                backgroundColor: '#FFB703',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 50,
                /*shadowColor: '#000',
                shadowOffset: {
                  width: 2,
                  height: 5,
                },
                shadowOpacity: 0.80,
                shadowRadius: 15,
                elevation: 2,*/
                // position: 'absolute'
              }}>
                <View style={styles.indicatorBefore}/>
                  <Image
                  source={require('./assets/picto_randonneur.png')}
                  style={{
                    height: 45,
                    width: 45,
                  }}
                  />
                  <View style={styles.indicatorAfter}/>
              </View>
            )
          } 
        },
        tabBarStyle: {
          backgroundColor: '#213A5C',
          borderRadius: 30,
          paddingTop: 15,
          height: 80,
          //shadowColor: '#000',
         /* shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0.40,
          shadowRadius: 15,
          elevation: 1,*/
        },
        tabBarActiveTintColor: "#FFB703",
        tabBarInactiveTintColor: "#fff",
        headerShown: false,
        tabBarShowLabel: false
      })}
      >
      <Tab.Screen name="Home" component={HomeScreen}/>
      <Tab.Screen name="News" component={NewsStack} />
      {(!token || showLoginProcess) ? <Tab.Screen name="Login" component={LoginScreen}/> 
      : <Tab.Screen name="Hike" component={ItinerariesScreen} />}
      <Tab.Screen name="Meteo" component={MeteoScreen} />
      <Tab.Screen name="User" component={UserStack} />
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
    //backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  indicatorBefore:{
    width: 22,
    height: 25,
    backgroundColor: '#213A5C',
    position: "absolute",
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
      position: "absolute",
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

