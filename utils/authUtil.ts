import firebase, { auth } from "firebase";
import { Alert } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import * as Facebook from "expo-facebook";

export const login = async (email: string, password: string): Promise<void> => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (e) {
    console.log(e);
  }
};

export const logout = async (): Promise<void> => {
  try {
    await auth().signOut();
  } catch (e) {
    console.log(e);
  }
};

export const register = async (
  email: string,
  password: string,
  name: string,
  comment: string
): Promise<void> => {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    await firebase.auth().currentUser!.updateProfile({
      displayName: name,
      photoURL:
        "https://i.pinimg.com/736x/2c/2c/60/2c2c60b20cb817a80afd381ae23dab05.jpg",
    });

    const uid = firebase.auth().currentUser!.uid;

    await firebase.database().ref("users/").child(uid).set({
      email: email,
      uid: uid,
      password: password,
      name: name,
      comment: comment,
      profile:
        "https://i.pinimg.com/736x/2c/2c/60/2c2c60b20cb817a80afd381ae23dab05.jpg",
    });
  } catch (e) {
    Alert.alert("실패", e.message);
  }
};

export const loginWithFacebook = async (): Promise<void> => {
  await Facebook.initializeAsync("944503832643236");

  const { type, token } = await Facebook.logInWithReadPermissionsAsync({
    permissions: ["public_profile", "email"],
  });

  if (type === "success") {
    const credential = firebase.auth.FacebookAuthProvider.credential(token);

    firebase
      .auth()
      .signInWithCredential(credential)
      .then((data) => {
        const user = data.user!;
        const db = firebase.database();
        const ref = db.ref(`/users/${user.uid}`);

        ref.set({
          uid: user.uid,
          name: user.displayName,
          profile: user.photoURL,
          email: user.email,
        });
      })
      .catch((err) => {
        console.warn(err);
      });
  }
};
