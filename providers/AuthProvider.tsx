import React, { useState, createContext } from "react"
import firebase, { auth } from 'firebase';
import * as Facebook from 'expo-facebook';
import { Alert } from "react-native";
import ProfileScreen from "../components/screens/ProfileScreen";

export type Auth = {
  user: any;
  setUser: any;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, comment:string) => Promise<void>;
  logout: () => Promise<void>;
  loginWithFacebook: () => Promise<void>;
  getProfile: () => Promise<User | null>;
}

interface User {
  comment: string;
  id: string;
  name: string;
  password: string;
  profile: string;
}

export const AuthContext = createContext<Auth | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email: string, password: string): Promise<void> => {
          try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
          }
        },
        register: async (email: string, password: string, name:string, comment: string): Promise<void> => {
          try {
            await firebase.auth().createUserWithEmailAndPassword(email, password);
            await firebase.auth().currentUser!.updateProfile({
              displayName: name,
              photoURL: "https://i.pinimg.com/736x/2c/2c/60/2c2c60b20cb817a80afd381ae23dab05.jpg",
            })
            const uid = firebase.auth().currentUser.uid;
            await firebase.database().ref('users/').child(uid).set({
              email: email,
              uid: uid,
              password: password,
              name: name,
              comment: comment,
              profile: "https://i.pinimg.com/736x/2c/2c/60/2c2c60b20cb817a80afd381ae23dab05.jpg",
            })
          } catch (e) {
            Alert.alert("실패", e.message);
          }
        },
        logout: async (): Promise<void> => {
          try {
            await auth().signOut();
            setUser(null);
          } catch (e) {
            console.log(e);
          }
        },
        loginWithFacebook: async (): Promise<void> => {
          await Facebook.initializeAsync(
            '944503832643236'
          );

          const {
            type,
            token
          } = await Facebook.logInWithReadPermissionsAsync(
              { permissions: ['public_profile'] }
            );

          if (type === 'success') {
            const credential = firebase.auth.FacebookAuthProvider.credential(token);

            firebase.auth().signInWithCredential(credential).catch((err) => {
              console.warn(err);
            });

          }
        },
        getProfile: async (): Promise<User | null> => {
          const db = firebase.database();
          const uid = firebase.auth().currentUser.uid;
          const ref = db.ref("/users/" + uid);
          let result = null;
          ref.on("value", (snapshot: any) => {
            result = snapshot.val();
          }, (errorObject: any) => {
            console.log(errorObject.code);
          });

          return result;
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}