import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FriendsScreen from '../screens/FriendsScreen';
import ChattingListScreen from '../screens/ChattingListScreen';

const HomeTabs = () => {
  
  const Tab = createMaterialTopTabNavigator();
  
  return(
    <Tab.Navigator>
      <Tab.Screen name="friends" component={FriendsScreen}/>
      <Tab.Screen name="chattingList" component={ChattingListScreen}/>
    </Tab.Navigator>
  )
}

export default HomeTabs;