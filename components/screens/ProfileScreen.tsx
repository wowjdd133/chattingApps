import * as React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { Button,Subheading } from 'react-native-paper';
import { AuthContext } from '../../providers/AuthProvider';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {

  const user = React.useContext(AuthContext);
  const Navigation = useNavigation();

  if(!user) return <Text>없어요 ㅋㅋ</Text>;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 4, alignItems: 'center', justifyContent: 'center' }}>
          <FontAwesome
            name="user"
            size={96}
          />
        </View>
        <View style={{ flex: 5 }}>
          <TouchableOpacity
            onPress={() => {
              console.log('navigate editProfile');
            }}
            style={{
              paddingLeft:30,
              backgroundColor:'#d9d9d9'
            }}
          >
            <Text
              style={{marginBottom: 5}}
            >
              상태 메시지
          </Text>
            <Subheading
            >
              아이고야
          </Subheading>
          </TouchableOpacity>
          <Button
            style={{ marginTop: 30 }}
            accessibilityStates
            mode="contained"
            onPress={() => {
              user.logout();
            }}
          >
            Logout
          </Button>
          <Button
            style={{
               marginTop: 30
            }}
            color="#f72f72"
            accessibilityStates
            mode="contained"
            onPress={() => {
              Navigation.goBack();
            }}
          >
            뒤로가기
          </Button>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default ProfileScreen;