import * as React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { Button, Subheading, Title, Avatar } from 'react-native-paper';
import { AuthContext } from '../../providers/AuthProvider';
import {
  getProfile
} from '../../utils/userUtil';
import { useNavigation } from '@react-navigation/native';

interface User {
  displayName: string;
  email: string;
  phoneNumbeR: string;
  photoURL: string;
  providerID: string;
  uid: string;
}

interface Profile {
  comment: string;
  // id: string;
  // name: string;
  // password: string;
  profile: string;
}

const ProfileScreen = () => {

  const user = React.useContext(AuthContext);
  const Navigation = useNavigation();

  if (!user) return <Text>없어요 ㅋㅋ</Text>;

  const [userProfile, setUserProfile] = React.useState<Profile>({
    comment: "상태 메시지가 없습니다.",
    profile: "",
  });

  React.useEffect(() => {
    (async () => {
      const data = await getProfile();
      if (data !== null) {
        console.warn(data);
        setUserProfile({
          comment: data.comment,
          profile: data.profile
        })
        // setUserProfile(data);
      }
    })();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => {
            console.log('navigate editProfile');
          }}
        style={{ flex: 7, alignItems: 'center', justifyContent: 'space-evenly' }}>
          <Avatar.Image
            accessibilityStates
            source={{ uri: user.user.photoURL }}
            size={224}
          />
          <Title>
            {user.user.displayName}
          </Title>

          <Title>
            {user.user.uid}
          </Title>

        </TouchableOpacity>
        <View style={{ flex: 5 }}>
          <TouchableOpacity
            onPress={() => {
              console.log('navigate editProfile');
            }}
            style={{
              paddingLeft: 30,
              backgroundColor: '#d9d9d9'
            }}
          >
            <Text
              style={{ marginBottom: 5 }}
            >
              상태 메시지
          </Text>
            <Subheading
            >
              {userProfile.comment}
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