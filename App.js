import { StyleSheet} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import MeteoScreen from './screens/MeteoScreen';
import NewsScreen from './screens/NewsScreen';
import UserScreen from './screens/UserScreen';
import HikeScreen from './screens/HikeScreen';
import UiKitScreen from './screens/UiKitScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = '';

          if (route.name === 'News') {
            iconName = 'location-arrow';
          } else if (route.name === 'Meteo') {
            iconName = 'location-arrow';
          } else if (route.name === 'Hike') {
            iconName = 'location-arrow';
          } else if (route.name === 'User') {
            iconName = 'location-arrow';
          } else if (route.name === 'Home') {
            iconName = 'location-arrow';
          }else if (route.name === 'UiKit') {
            iconName = 'location-arrow';
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#ec6e5b',
        tabBarInactiveTintColor: '#335561',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="News" component={NewsScreen} />
      <Tab.Screen name="Hike" component={HikeScreen} />
      <Tab.Screen name="Meteo" component={MeteoScreen} />
      <Tab.Screen name="User" component={UserScreen} />
      <Tab.Screen name="UiKit" component={UiKitScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
