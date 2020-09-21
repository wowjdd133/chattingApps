import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Alert } from 'react-native';
import { Text } from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';
import { getRequesters, responseFriend } from '../../utils/userUtil';
import { AuthContext } from '../../providers/AuthProvider';
import UserListItem from '../common/UserListItem';

interface User {
  comment: string;
  name: string;
  profile: string;
  uid: string;
}

const RequestersScreen = () => {

  const [requesters, setRequesters] = React.useState<User[] | null>();
  const authContext = React.useContext(AuthContext);

  React.useEffect(() => {
    (async () => {
      await getRequesters(authContext!.user.uid, setRequesters);
    })();
  },[])

  const handleOnPress = (uid:string,reqUid:string) => {
    
    Alert.alert("친구 요청이 왔습니다.", 
    "수락하시겠습니까?",
    [
      {
        text:'거절',
        onPress:async () => {
          await responseFriend(uid,reqUid,false);
        }
      },
      {
        text:'수락',
        onPress:async () => {
          await responseFriend(uid,reqUid,true);
        }
      }
    ]
    )
  }

  return(
    <SafeAreaView
      style={{flex:1}}
    >
      <View
        style={{flex:1}}
      >
        {requesters ? <FlatList
          keyExtractor={item => item.uid}
          data={requesters}
          renderItem={({item}) => {
            return (
              <UserListItem
                onPress={handleOnPress}
                item={item}
              />
            )
          }}
        /> : <Text
          accessibilityStates
        >없네요</Text>}
        
      </View>
    </SafeAreaView>
  )
}

export default RequestersScreen;