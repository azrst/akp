import React from 'react';
import { View, Text } from 'react-native';

import SplashScreen from '../component/Splash'
import HomeScreen from '../component/drawer/Home'
import ProfileScreen from '../component/drawer/Profile'
import AboutScreen from '../component/drawer/About'
import FirstPage from '../component/FirstPage'
import DetailPage from '../component/Detail'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icons from 'react-native-vector-icons/Ionicons';


const Stack = createStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="FirstPage" component={FirstPage} />
        <Stack.Screen name="Homes" component={Homes} />
        <Stack.Screen name="Detail" component={DetailPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Tab = createBottomTabNavigator();
function Homes() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iconColor;
          if (route.name === 'Home') {
            iconName = 'ios-analytics'
            iconColor = focused ? '#5C3098' : 'grey'
          } else if (route.name === 'About') {
            iconName = 'ios-help-buoy'
            iconColor = focused ? '#5C3098' : 'grey'
          } else if (route.name === 'Extras') {
            iconName = 'ios-pulse'
            iconColor = focused ? '#5C3098' : 'grey'
          }

          // You can return any component that you like here!
          return <Icons name={iconName} size={size} color={iconColor} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#5C3098',
        inactiveTintColor: 'gray',
        keyboardHidesTabBar: true,
        showTabBar: false,
        allowFontScaling: true
      }}
      options={{ tabBarVisible: false }}
    >
      <Tab.Screen name="Extras" component={ProfileScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="About" component={AboutScreen} />
    </Tab.Navigator>
  );
}

export default App