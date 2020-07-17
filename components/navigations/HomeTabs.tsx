import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FriendsScreen from '../screens/FriendsScreen';
import ChattingScreen from '../screens/ChattingScreen';

const HomeTabs = () => {
  
  const Tab = createMaterialTopTabNavigator();
  
  return(
    <Tab.Navigator>
      <Tab.Screen name="friends" component={FriendsScreen}/>
      <Tab.Screen name="chatting" component={ChattingScreen}/>
    </Tab.Navigator>
  )
}

export default HomeTabs;