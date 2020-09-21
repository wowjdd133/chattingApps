import firebase, { auth, functions } from 'firebase';
import { Children } from 'react';

interface User {
  comment: string;
  uid: string;
  name: string;
  profile: string;
}

export const getProfile = async (uid:string):Promise<User | null> => {

  const db = firebase.database();
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

  await ref.orderByKey().limitToLast(100).once("value", (snapshot: any) => {
    let data = snapshot.val();

    data = Object.values(data);
    
    result = data.map((item:User) => {
      return {
        uid: item.uid,
        profile: item.profile,
        comment: item.comment,
        name: item.name
      }
    })
  }, (errorObject: any) => {
    console.warn(errorObject.code)
  })

  return result;
}

export const getRequesters = async (uid:string, setRequesters:any) => {
  const db = firebase.database();
  const ref = db.ref('/users/');

  ref.child(`${uid}/friends`).on('value', async (snapshot) => {
    let result = [];
    const data = snapshot.val();

    for (const requesterID in data) {
      if(data[requesterID]) {
        console.log(data[requesterID]);
        continue;
      }

      const userData = await getProfile(requesterID);
      
      if(userData != null)
        result.push(userData);
    }

    setRequesters(result);
  })
}

export const responseFriend = async (uid:string, reqUid:string, response:boolean):Promise<Boolean> => {
  try{
    const db = firebase.database();
    const ref = db.ref(`/users/${uid}/friends`);

    if(response){
      let data = {};
      data[`${reqUid}`] = true;

      await ref.update(data);
    } else {
      await ref.child(reqUid).remove();
    }

    return true;
    
  }catch(err){
    console.warn(err);
    return false;
  }
}

export const requestFriend = async (uid:string, reqUid:string):Promise<Boolean> => {
  
  try{
    const db = firebase.database();
    const ref = db.ref(`/users/${reqUid}/friends`);
  
    const data = {}
  
    data[`${uid}`] = false;
  
    await ref.update(data);
    
  }catch(err){
    console.log(err);
    return false;
  }
  
  return true;
}