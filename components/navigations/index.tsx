import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import { AuthContext } from '../../providers/AuthProvider';
import { Text } from 'react-native';
import firebase from 'firebase';
import HomeStack from './HomeStack';
import { navigationRef } from './RootNavigation';

const Navigation = () => {
  
  const user = React.useContext(AuthContext);
  if(user == undefined) return <Text>이게 가능할려나..</Text>

  const onAuthstateChanged = (_user:any) => {
    user.setUser(_user);
  }

  React.useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthstateChanged);

    return subscriber;
  },[])

  return (
    <NavigationContainer
      ref={navigationRef}
    >
      {user.user ? <HomeStack/> : <AuthStack/>}
    </NavigationContainer>
  )
}

export default Navigation;