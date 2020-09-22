import * as React from 'react';
import {AuthContext} from '../../providers/AuthProvider';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { View } from 'react-native';
import { Avatar, Text } from 'react-native-paper';
import ProfileIcon from './ProfileIcon';

const UserListItem = ({item, onPress}) => {

  const authContext = React.useContext(AuthContext)

  return (
    <TouchableOpacity
      onPress={() => {onPress(authContext!.user.uid, item.uid)}}
      style={{
        flexDirection: 'row',
        marginTop:7,
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
        <ProfileIcon
          size={64}
          uri={item.profile}
        />
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

export default UserListItem;