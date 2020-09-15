import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import {
  loginWithFacebook,
} from '../../utils/AuthUtil';
import { Button } from 'react-native-paper';
// import {AuthContext} from '../../providers/AuthProvider';
import * as RootNavigation from '../navigations/RootNavigation';

const LoginScreen = () => {

  // const user = React.useContext(AuthContext);
  // if(user == undefined) return <Text>이게 가능할려나..</Text>
  
  return (
    <View style={styles.container}>
      <View style={{ flex: 4, justifyContent:'center' }}>
        <AntDesign name="wechat" size={96} color="#8b00ff" />
      </View>

      <View style={{ flex: 5,width:'100%' , alignItems:'center'}}>
        <Button
          accessibilityStates
          mode="contained"
          style={styles.button}
          labelStyle={styles.buttonLabel}
          color="#000000"
          onPress={() => {
            RootNavigation.navigate('signIn',null);
          }}
        >
          로그인
      </Button>
        <Button
          mode="contained"
          color="#000000"
          style={styles.button}
          labelStyle={styles.buttonLabel}
          accessibilityStates
          onPress={() => {
            RootNavigation.navigate('signUp',null);
          }}
        >
          회원가입
      </Button>
        <Button
          icon="facebook"
          mode="contained"
          style={styles.button}
          color="#3B5998"
          labelStyle={styles.buttonLabel}
          accessibilityStates
          onPress={async () => {
            await loginWithFacebook();
          }}
        >
          페이스북으로 로그인
      </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    width: '70%',
    marginBottom:45,
  },
  buttonLabel: {
    fontSize: 18
  }
})

export default LoginScreen;