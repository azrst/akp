import React from 'react';
import { View, Text } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import SplashScreen from '../component/Splash'
import HomeScreen from '../component/drawer/Home'
import AboutScreen from '../component/drawer/About'

const AppNavigator = createStackNavigator(
    {
        Splash: {
            screen: SplashScreen,
        },
        tab : {
            screen : createBottomTabNavigator(
                {   
                    Home : HomeScreen,
                    About : AboutScreen
                }
            )
        },
    },
    {
        initialRouteName: "Splash",
        headerMode : 'none'
    },
);

// const TabNavigator = createBottomTabNavigator(
//     {   
//             Home: HomeScreen,
//             About: AboutScreen,
//     }
// );

export default createAppContainer(AppNavigator);