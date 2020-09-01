import * as React from 'react';
import { View, Text, FlatList, TouchableOpacity, ImageBackground, Image } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import * as firebase from 'firebase';
import {AuthContext} from '../../providers/AuthProvider';

const exampleUserList = {
  user: [{
    profileURL: "",
    name: "김첨지",
    uid: 'asdfasdvafwefad532zvzvxcHDBSF',
    statusMessage: "1렇게 살자"
  }, {
    profileURL: "",
    name: "김첨지2",
    uid: 'xzcbxzcvqdwdw^$&HDBSF',
    statusMessage: "2렇게 살자"
  }, {
    profileURL: "",
    name: "김첨지3",
    uid: 'adfqzxcvbefe^$&HDBSF',
    statusMessage: "3렇게 살자"
  }]
}

const FriendsScreen = () => {

  const user = React.useContext(AuthContext);
  const navigation = useNavigation();
  
  // React.useEffect((() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     const uid = user.user.uid;
  //     const userRef = firebase.database().ref('/users/' + uid);
  //     userRef.on('value', (snapshot: any) => {
  //       if(snapshot.val() == null){
  //         navigation.navigate('updateProfile');
  //       }
  //     })
  //   })

  //   return unsubscribe;
  // }),[navigation])


  return (
    <View style={{ flex: 1 }}>
      <FlatList
        contentContainerStyle={{ flex: 1 }}
        data={exampleUserList.user}
        keyExtractor={(item) => item.uid}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                minHeight: 90,
              }}
              onPress={() => { }}
            >
              <View style={{ flex: 2, alignItems:'center', justifyContent:'center' }}>
                <Image
                  source={{
                    uri:"https://i.pinimg.com/736x/2c/2c/60/2c2c60b20cb817a80afd381ae23dab05.jpg",
                  }}
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 35,
                    marginLeft:15
                  }}
                />
              </View>
              <View style={{ flex: 3, alignItems:'center', justifyContent:'center' }}>
                <Text>{item.name}</Text>
              </View>
              <View style={{ flex: 4, alignItems:'center', justifyContent:'center' }}>
                <Text>{item.statusMessage}</Text>
              </View>
            </TouchableOpacity>
          )
        }}
      />
    </View>
  )
}

export default FriendsScreen;