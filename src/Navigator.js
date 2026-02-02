import React, { useEffect, useRef } from 'react'; // useRef ve useEffect ekledik
import { Animated } from 'react-native'; // Animated ekledik
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, Ionicons, FontAwesome6, MaterialIcons } from '@expo/vector-icons'; 

import Vault from './Screens.js/Vault';
import History from './Screens.js/History';
import Home from './Screens.js/Home';
import Add from './Screens.js/Add';
import Reccuring from './Screens.js/Recurring';

const Tab = createBottomTabNavigator();


const AnimatedIcon = ({ children, focused }) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(scaleValue, {
      toValue: focused ? 1.2 : 1, 
      friction: 4,
      useNativeDriver: true,
    }).start();
  }, [focused]);

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
      {children}
    </Animated.View>
  );
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#E5EBEE',
            borderTopWidth: 0,
            borderRadius: 36,
            height: '11%', 
            paddingTop: 10,
            paddingBottom: 7,
            position: 'absolute',
            left: 20,
            right: 20,
            elevation: 5,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.1,
            shadowRadius: 10,
          },
          tabBarActiveTintColor: '#01114E',
          tabBarInactiveTintColor: '#A0A0A0',
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size, focused }) => { // focused değerini ekledik
            let icon;
            if (route.name === 'Vault') {
              icon = <FontAwesome6 name="vault" size={20} color={color} />;
            } else if (route.name === 'History') {
              icon = <Ionicons name="receipt" size={21} color={color} />;
            } else if (route.name === 'Home') {
              icon = <Ionicons name="home" size={25} color={color} />;
            } else if (route.name === 'Add') {
              icon = <Ionicons name="add-circle" size={23} color={color} />; 
            } else if (route.name === 'Reccuring') {
              icon = <FontAwesome6 name="arrows-rotate" size={20} color={color} />;
            }

            // İkonu hazırladığımız animasyonlu View ile sarmalıyoruz
            return <AnimatedIcon focused={focused}>{icon}</AnimatedIcon>;
          },
        })}
      >
        <Tab.Screen name="Vault" component={Vault} />
        <Tab.Screen name="History" component={History} />
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Add" component={Add} />
        <Tab.Screen name="Reccuring" component={Reccuring} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;