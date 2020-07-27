import * as React from 'react';
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';

const SignInScreen = () => {

  return (
    <SafeAreaView
      style={{ flex: 1 }}
    >
      <KeyboardAvoidingView
        style={{ flex: 1, alignItems: 'center' }}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.select({ ios: 0, android: -500 })}
      >
        <View style={{ flex: 4, justifyContent: 'center' }}>
          <AntDesign name="wechat" size={96} color="#8b00ff" />
        </View>
        <View style={{
          flex: 5,
          alignSelf: 'stretch',
          justifyContent: 'space-evenly'
        }}>
          <View style={{
            alignSelf: 'stretch'
          }}>
            <TextInput
              accessibilityStates
              placeholder="이메일"
            />
            <TextInput
              accessibilityStates
              placeholder="패스워드"
              style={{ marginTop: 30 }}
              secureTextEntry
            />
          </View>
        </View>
        <Button
          accessibilityStates
          onPress={() => { }}
          color="#ffffff"
          style={{
            backgroundColor: '#000000',
            width: '100%',
          }}
          contentStyle={{
            justifyContent: 'center',
            height: 70
          }}
        >
          dfasdf
        </Button>
      </KeyboardAvoidingView>
    </SafeAreaView>

  )
}

export default SignInScreen;