import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import UsersScreen from '../screens/UsersScreen';
import RequestersScreen from '../screens/RequestersScreen';

const UserTabs = () => {

  const Tab = createMaterialTopTabNavigator();

  return(
    <Tab.Navigator>
      <Tab.Screen name="users" component={UsersScreen}/>
      <Tab.Screen name="requesters" component={RequestersScreen}/>
    </Tab.Navigator>
  )
}

export default UserTabs;