import * as React from 'react';
import { View, Platform, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
// import { AuthContext } from '../../providers/AuthProvider';
import {
  login
} from '../../utils/authUtil';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const SignInScreen = () => {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  // const user = React.useContext(AuthContext);
  // if (user == undefined) return <View style={{ flex: 1, backgroundColor: 'black' }}></View>

  const handleSignUp = async (): Promise<void> => {
    if (email.length >= 8) {
      if (password.length >= 8) {
          await login(email, password);
      } else {
        Alert.alert("실패", "패스워드는 9자 이상으로 해주세요.");
      }
    } else {
      Alert.alert("실패", "이메일은 9자 이상으로 해주세요.");
    }
  }

  return (
    <SafeAreaView
      style={{ flex: 1 }}
    >
      <KeyboardAwareScrollView
        enableAutomaticScroll
        extraScrollHeight={10}
        enableOnAndroid
        extraHeight={Platform.select({ android: 100 })}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={{ alignSelf: 'stretch', flex: 1, alignItems: 'center' }}>
          <View style={{ flex: 2, justifyContent: 'center' }}>
            <AntDesign name="wechat" size={96} color="#8b00ff" />
          </View>
          <View style={{
            flex: 3,
            alignSelf: 'stretch'
          }}>
            <TextInput
              accessibilityStates
              placeholder="이메일"
              value={email}
              maxLength={25}
              onChangeText={(text: string) => {
                setEmail(text);
              }}
            />
            <TextInput
              accessibilityStates
              placeholder="패스워드"
              value={password}
              onChangeText={(text: string) => {
                setPassword(text);
              }}
              style={{marginTop:30}}
              maxLength={20}
              secureTextEntry
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
      <Button
        accessibilityStates
        onPress={handleSignUp}
        color="#ffffff"
        style={{
          position: 'absolute',
          backgroundColor: '#000000',
          bottom: 0,
          width: '100%',
        }}
        contentStyle={{
          justifyContent: 'center',
          height: 60
        }}
      >
        로그인
      </Button>
    </SafeAreaView>
  )
}

export default SignInScreen;