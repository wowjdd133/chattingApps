import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Alert
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInput, Button } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import {
  register
} from '../../utils/AuthUtil';
// import { AuthContext } from '../../providers/AuthProvider';

const SignUpSreen = () => {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [comment, setComment] = React.useState('');

  // const user = React.useContext(AuthContext);
  // if (user == undefined) return <View style={{ flex: 1, backgroundColor: 'black' }}></View>

  const handleSignIn = async (): Promise<void> => {
    if (email.length >= 8) {
      if (password.length >= 8) {
        if (name.length >= 2) {
          await register(email, password, name, comment);
        } else {
          Alert.alert("실패", "이름은 3자 이상으로 해주세요.")
        }
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
            flex: 5,
            alignSelf: 'stretch',
            justifyContent: 'space-evenly'
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
              style={{ marginTop: 30 }}
              value={password}
              onChangeText={(text: string) => {
                setPassword(text);
              }}
              maxLength={20}
              secureTextEntry
            />
            <TextInput
              accessibilityStates
              placeholder="이름"
              style={{ marginTop: 30 }}
              value={name}
              maxLength={8}
              onChangeText={(text: string) => {
                setName(text);
              }}
            />
            <TextInput
              accessibilityStates
              placeholder="한줄 소개"
              style={{ marginTop: 30 }}
              value={comment}
              maxLength={25}
              onChangeText={(text: string) => {
                setComment(text);
              }}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
      <Button
        accessibilityStates
        onPress={handleSignIn}
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
        회원가입
        </Button>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  }
})

export default SignUpSreen;