import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar, Button } from 'react-native-paper';
import { AuthContext } from '../../providers/AuthProvider';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const UpdateProfileScreen = () => {

  const user = React.useContext(AuthContext)

  if (!user) return <Text>없어요 ㅋㅋ</Text>;

  return (
    <View
      style={styles.container}
    >
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        resetScrollToCoords={{ x: 0, y: 0 }}
        enableOnAndroid
      >
        <View
          style={styles.viewContainer}
        >
          <TouchableOpacity
            style={styles.imageContainer}
          >
            <Avatar.Image
              accessibilityStates
              source={{ uri: user.user.photoURL }}
              size={224}
            />
          </TouchableOpacity>
          <View style={{ flex: 2 }}>
            <TextInput style={{ backgroundColor: 'red' }} />
            <TextInput style={{ backgroundColor: 'blue' }} />
          </View>
        </View>
      </KeyboardAwareScrollView>
      <Button
        mode="contained"
        color="#dd93ee"
        labelStyle={styles.buttonLabel}
        accessibilityStates
        onPress={async (): Promise<void> => {
          try {

          } catch (err) {
            console.log(err);
          }
        }}
      >
        입력 완료
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonLabel: {
    fontSize: 18
  },
  imageContainer: {
    flex: 4,
    justifyContent: 'center',
    alignSelf: 'center'
  }
})

export default UpdateProfileScreen;