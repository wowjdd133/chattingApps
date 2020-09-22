import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FriendsScreen from '../screens/FriendsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import UsersScreen from '../screens/UsersScreen';
import UpdateProfileScreen from '../screens/UpdateProfileScreen';
import ChattingScreen from '../screens/ChattingListScreen';
import UsersTabs from './UserTabs'
import HomeTabs from './HomeTabs';
import { Button, TouchableOpacityComponent, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as RootNavigation from './RootNavigation';
import * as firebase from 'firebase';
import { AuthContext } from '../../providers/AuthProvider';
import ChattingStack from './ChattingStack';
// import {useNavigation} from '@react-navigation/native';
// import * as navigater from './RootNavigation';

const HomeStack = () => {

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
          headerLeft: () => (
            <TouchableOpacity
              style={{ height: '100%', justifyContent: 'center', marginLeft: 24 }}
              onPress={() => { 
                RootNavigation.navigate('chattingList',null);
              }}
            >
              <FontAwesome name="arrow-left" size={32} color="black" />
            </TouchableOpacity>
          ),
          headerTitle: '채팅'
        }}
      name="chatting" component={ChattingScreen}/>
      <Stack.Screen name="usersTab" component={UsersTabs}/>
      <Stack.Screen
        options= {{
          headerShown: false,
        }}
      name="profile" component={ProfileScreen} />
      <Stack.Screen
        options= {{
          headerShown: false,
        }}
        name="updateProfile" component={UpdateProfileScreen}
      />

    </Stack.Navigator>
  )
}

export default HomeStack;