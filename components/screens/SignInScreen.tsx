import * as React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Button } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignInScreen = () => {
  return (

    <SafeAreaView
      style={{ flex: 1 }}
    >
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid
        extraScrollHeight={10}
        scrollEnabled
      >
        <View style={{ flex:1, alignItems: 'center' }}>
          <View style={{ flex: 5 }}>
            <Text>hi</Text>
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
                placeholder="이메일"
              />
              <TextInput
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
              height: 70
            }}
          >
            dfasdf
        </Button>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>

  )
}

export default SignInScreen;