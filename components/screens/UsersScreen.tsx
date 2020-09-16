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

interface User {
  comment: string;
  email: string;
  name: string;
  password: string;
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

const UsersListItem = ({item, onPress}) => {

  const authContext = React.useContext(AuthContext)

  return (
    <TouchableOpacity
      onPress={() => {onPress(authContext!.user.uid, item.uid)}}
      style={{
        flexDirection: 'row',
        marginTop: 7,
        marginBottom: 7,
        flex: 1,
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: 25,
        }}
      >
        <Avatar.Image
          size={64}
          accessibilityStates
          source={{ uri: item.profile }}
        >
        </Avatar.Image>
      </View>
      <View
        style={{
          flex: 2,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Text
          style={{ fontSize: 19 }}
          accessibilityStates
        >
          {item.name}
        </Text>
      </View>
      <View
        style={{
          flex: 3,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Text
          accessibilityStates
        >
          {item.comment ? item.comment : '소개가 없습니다.'}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const UsersScreen = () => {

  const [users, setUsers] = React.useState<User[] | null>([]);

  React.useEffect(() => {
    (async () => {
      let data = await getUsers();

      if (data != null) {
        data = Object.values(data);
      }

      setUsers(data);
    })();
  }, []);

  console.log(users);

  const handleOnPress = (uid: string, reqUid: string) => {
    Alert.alert("친구 추가 요청",'친구 추가 요청을 하시겠습니까?',
      [
        {
          text: "취소"
        },
        {
          text: "요청",
          onPress: async () => {
            await requestFriend(uid = uid, reqUid = reqUid);
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
        keyExtractor={item => item.uid}
        style={{ flex: 1, width: '100%' }}
        data={users}
        ItemSeparatorComponent={renderSeparator}
        renderItem={({ item }) => {
          return (
            <UsersListItem
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