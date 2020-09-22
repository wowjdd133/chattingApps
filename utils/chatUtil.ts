import firebase from 'firebase';
import { getProfile } from './userUtil';

const db = firebase.database();

const getRoomID = (uid: string, reqUid: string) => {
  if(uid <= reqUid){
    return uid + '/' + reqUid;
  }
  return reqUid + '/' + uid;
}

export const getRoom = (uid: string, reqUid: string) => {
  
  

  const roomId = getRoomID(uid, reqUid);

  const ref = db.ref(`/rooms/${roomId}`);

  ref.once("value", async (snapshot) => {
    const data = snapshot.val();

    if(data == null){

      const userData = await getProfile(uid);
      const reqUserData = await getProfile(reqUid);

      if(userData == null || reqUserData == null)
        throw new Error('유저 데이터를 받아오지 못 했습니다.');

      ref.set({
        lastMessage: "채팅방이 생성되었습니다.",
        profiles: userData.profile + ',' + reqUserData.profile,
        userNames: userData.name + ',' + reqUserData.name,
        timestamp: new Date(),
      })
    }

    
  }) 

}