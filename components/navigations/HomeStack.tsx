import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FriendsScreen from '../screens/FriendsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ChattingScreen from '../screens/ChattingScreen';
import HomeTabs from './HomeTabs';
import { Button, TouchableOpacityComponent, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as RootNavigation from './RootNavigation';

const HomeStack = () => {

  //friedns, profile은 tabbar로 만들기.
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={
        {
          headerTitle: 'chattingApp',
          headerLeft: () => (
            <TouchableOpacity
              style={{ height: '100%', justifyContent: 'center', marginLeft: 24 }}
              onPress={() => { 
                RootNavigation.navigate('profile',null);
              }}
            >
              <FontAwesome name="user" size={32} color="black" />
            </TouchableOpacity>
          )
        }
      }
    >
      <Stack.Screen name="homeTab" component={HomeTabs} />
      <Stack.Screen
        options= {{
          headerShown: false,
        }}
      name="profile" component={ProfileScreen} />
    </Stack.Navigator>
  )
}

export default HomeStack;