import firebase, { auth } from 'firebase';
import { Children } from 'react';

interface User {
  comment: string;
  uid: string;
  name: string;
  profile: string;
}

export const getProfile = async ():Promise<User | null> => {

  const db = firebase.database();
  const uid = firebase.auth().currentUser!.uid;
  const ref = db.ref("/users/" + uid);

  let result:User | null = null;

  await ref.once("value", (snapshot: any) => {
    const {
      uid,
      comment,
      name,
      profile
    } = snapshot.val();
    
    result = {
      uid,
      comment,
      name,
      profile
    }

  }, (errorObject: any) => {
    console.log(errorObject.code);
  })

  return result;
}

export const getUsers = async ():Promise<User[] | null> => {
  
  const db = firebase.database();
  const ref = db.ref("/users");

  let result:User[]= [];

  await ref.orderByKey().limitToLast(100).on("child_added", (snapshot: any) => {
    let data = snapshot.val();
    
    result.push({
      uid: data.uid,
      comment: data.comment,
      profile: data.profile,
      name: data.name,
    });
    // console.log(data);
    
    // result = data.map((item:User) => {
    //   return {
    //     uid: item.uid,
    //     profile: item.profile,
    //     comment: item.comment,
    //     name: item.name
    //   }
    // })

  }, (errorObject: any) => {
    console.warn(errorObject.code)
  })

  return result;
}

export const getRequesters = async (uid:string):Promise<User[] | null> => {

  const db = firebase.database();
  const ref = db.ref("/users/");

  let result = null;

  await ref.child(`${uid}/request`).on("child_added", (snapshot: any) => {
    const data = snapshot.val();
    const key = snapshot.key
    
    console.log(data);
  }, (errorObject: any) => {
    console.log(errorObject.code);
  });

  console.log(result);
  return result;
}

export const requestFriend = async (uid:string, reqUid:string):Promise<Boolean> => {
  
  const db = firebase.database();
  const ref = db.ref(`/users/${reqUid}/request`).child(uid);

  await ref.update(false);
  
  return true;
}