import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FriendsScreen from '../screens/FriendsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import UsersScreen from '../screens/UsersScreen';
import UpdateProfileScreen from '../screens/UpdateProfileScreen';
import ChattingScreen from '../screens/ChattingScreen';
import HomeTabs from './HomeTabs';
import { Button, TouchableOpacityComponent, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as RootNavigation from './RootNavigation';
import * as firebase from 'firebase';
import { AuthContext } from '../../providers/AuthProvider';
// import {useNavigation} from '@react-navigation/native';
// import * as navigater from './RootNavigation';

const HomeStack = () => {

  //friedns, profile은 tabbar로 만들기.
  const Stack = createStackNavigator();
  // const user = React.useContext(AuthContext);
  // const navigation = useNavigation();
  
  // React.useEffect((() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     const uid = user.user.uid;
  //     const userRef = firebase.database().ref('/users/' + uid);
  //     userRef.on('value', (snapshot: any) => {
  //       if(snapshot.val() == null){
  //         navigater.navigate('profile','');
  //       }
  //     })
  //   })

  //   return unsubscribe;
  // }),[navigation])

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
      <Stack.Screen
        options= {{
          headerShown: false,
        }}
        name="updateProfile" component={UpdateProfileScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Users" component={UsersScreen}
      />
    </Stack.Navigator>
  )
}

export default HomeStack;