import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SignUpSreen from '../screens/SignUpScreen';
import firebase from 'firebase';
import { AuthContext } from '../../providers/AuthProvider';
import { Text } from 'react-native';
import SignInScreen from '../screens/SignInScreen';

const AuthStack = () => {

  const Stack = createStackNavigator();

  const user = React.useContext(AuthContext);
  if(user == undefined) return <Text>이게 가능할려나..</Text>
  
  const [loading, setLoading] = React.useState(true);

  const onAuthstateChanged = (_user:any) => {
    user.setUser(_user);
    setLoading(false);
  }

  React.useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthstateChanged);

    return subscriber;
  },[])

  return (
    <Stack.Navigator
      headerMode="none"
    >
      <Stack.Screen name="login" component={LoginScreen}/>
      <Stack.Screen name="signIn" component={SignInScreen}/>
      <Stack.Screen name="signUp" component={SignUpSreen}/>
    </Stack.Navigator>
  )
}

export default AuthStack;