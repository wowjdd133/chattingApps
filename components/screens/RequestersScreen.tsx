import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';
import { getRequesters } from '../../utils/userUtil';
import { AuthContext } from '../../providers/AuthProvider';
import UserListItem from '../common/UserListItem';

interface User {
  comment: string;
  email: string;
  name: string;
  password: string;
  profile: string;
  uid: string;
}

const RequestersScreen = () => {

  const [requesters, setRequesters] = React.useState<User[] | null>();
  const authContext = React.useContext(AuthContext);

  React.useEffect(() => {
    (async () => {
      const data = await getRequesters(authContext!.user.uid);

      setRequesters(data);
    })();
  },[])

  const handleOnPress = () => {

  }

  return(
    <SafeAreaView
      style={{flex:1}}
    >
      <View
        style={{flex:1}}
      >
        <FlatList
          data={requesters}
          renderItem={({item}) => {
            return (
              <UserListItem
                onPress={handleOnPress}
                item={item}
              />
            )
          }}
        />
      </View>
    </SafeAreaView>
  )
}

export default RequestersScreen;