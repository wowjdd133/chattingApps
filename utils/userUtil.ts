import firebase, { auth } from 'firebase';
import { Children } from 'react';

interface User {
  comment: string;
  uid: string;
  email: string;
  name: string;
  password: string;
  profile: string;
}

export const getProfile = async ():Promise<User | null> => {

  const db = firebase.database();
  const uid = firebase.auth().currentUser!.uid;
  const ref = db.ref("/users/" + uid);

  let result = null;

  await ref.once("value", (snapshot: any) => {
    result = snapshot.val();
  }, (errorObject: any) => {
    console.log(errorObject.code);
  })

  return result;
}

export const getUsers = async ():Promise<User[] | null> => {
  
  const db = firebase.database();
  const ref = db.ref("/users");

  let result = null;

  await ref.once("value", (snapshot: any) => {
    const data = snapshot.val();
    if(data != null)
      result = Object.values(data);
  }, (errorObject: any) => {
    console.warn(errorObject.code)
  })
  return result;
}

export const getRequesters = async (uid:string):Promise<User[] | null> => {

  const db = firebase.database();
  const ref = db.ref("/users/");

  let result = null;

  await ref.child(uid).orderByChild('name').on("value", (snapshot: any) => {
    const data = snapshot.val();
    if(data != null){
      result = Object.values(data);
    }
  }, (errorObject: any) => {
    console.log(errorObject.code);
  });
  return result;
}

export const requestFriend = async (uid:string, reqUid:string):Promise<Boolean> => {
  
  const db = firebase.database();
  const ref = db.ref(`/users/${uid}/request`).child(reqUid)

  await ref.set({
    reqUid: false
  });
  
  return true;
}