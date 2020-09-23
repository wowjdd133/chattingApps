import * as React from 'react';
import { View, Text, FlatList, TouchableOpacity, ImageBackground, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as firebase from 'firebase';
import { AuthContext } from '../../providers/AuthProvider';
import { Button } from 'react-native-paper';
import UserListItem from '../common/UserListItem';
import { getFriends, removeFriend } from '../../utils/userUtil';

interface User {
  comment: string;
  name: string;
  profile: string;
  uid: string;
}

const FotterButton = ({ onPress }) => {
  return (
    <Button
      accessibilityStates
      style={
        {
          backgroundColor: 'black',
          height: '10%',
          justifyContent: 'center'
        }}
      labelStyle={{
        fontSize: 19
      }}
      color={"#FFFFFF"}
      onPress={onPress}
      children={'친구 찾기'}
    />
  )
}

const renderSeparator = () => {
  return (
    <View
      style={{
        height: 1,
        width: '100%',
        backgroundColor: "#CED0CE",
      }}
    />
  );
};

const FriendsScreen = () => {

  const authContext = React.useContext(AuthContext);
  const navigation = useNavigation();

  const [friends, setFriends] = React.useState<User[]>([]);

  React.useEffect(() => {
    getFriends(authContext!.user.uid, setFriends);
  }, [])

  const handleOnClick = () => {
    navigation.navigate('usersTab');
  }

  const onPress = (uid: string, reqUid: string) => {
    Alert.alert(
      "요청",
      "행동",
      [
        {
          text: "취소",
          style: "cancel"
        },
        {
          text: "친구 삭제",
          onPress: () => {
            Alert.alert("친구 삭제", "정말로 삭제하실건가요?",
              [{
                text: "취소",
                style: "cancel"
              },
              {
                text: "삭제 하기",
                onPress: async () => { await removeFriend(uid, reqUid); }
              }])
          }
        },
        {
          text: "채팅 하기",
          onPress: () => {
            navigation.navigate("chatting");
           }
        },
      ])
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={{ marginTop: 15 }}
        data={friends}
        keyExtractor={(item) => item.uid}
        renderItem={({ item }) => {
          return (
            <UserListItem
              item={item}
              onPress={onPress}
            />
          )
        }}
        ItemSeparatorComponent={renderSeparator}
      />
      <FotterButton
        onPress={handleOnClick}
      />
    </View>
  )
}

export default FriendsScreen;