import * as React from 'react';
import { FlatList, View, TouchableOpacity, Alert } from 'react-native';
import { Text, Avatar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  getUsers,
  requestFriend
} from '../../utils/userUtil';
import {
  AuthContext
} from '../../providers/AuthProvider';
import UserListItem from '../common/UserListItem';

interface User {
  comment: string;
  name: string;
  profile: string;
  uid: string;
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

const UsersScreen = () => {

  const [users, setUsers] = React.useState<User[] | null>([]);

  React.useEffect(() => {
    (async () => {
      let data = await getUsers();
      
      setUsers(data);
    })();
  }, []);


  const handleOnPress = (uid: string, reqUid: string) => {
    Alert.alert("친구 추가 요청",'친구 추가 요청을 하시겠습니까?',
      [
        {
          text: "취소"
        },
        {
          text: "요청",
          onPress: async () => {
            try{
              await requestFriend(uid, reqUid);
              Alert.alert("성공");
            }catch(err){
              console.warn(err);
              Alert.alert("실패");
            }
          }
        }
      ]
    );
  }

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <FlatList
        keyExtractor={(item) => item.uid.toString()}
        style={{ flex: 1, width: '100%' }}
        data={users}
        ItemSeparatorComponent={renderSeparator}
        renderItem={({ item }) => {
          return (
            <UserListItem
              onPress={handleOnPress}
              item={item}
            />
          )
        }}
      />
    </SafeAreaView>

  )
}

export default UsersScreen;