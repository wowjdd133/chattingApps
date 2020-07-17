import React, { useState, createContext } from "react"
import firebase, { auth } from 'firebase';
import * as Facebook from 'expo-facebook';

export type Auth = {
  user: any;
  setUser: any;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loginWithFacebook: () => Promise<void>;
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
        register: async (email: string, password: string): Promise<void> => {
          try {
            await firebase.auth().createUserWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
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
              console.log(err);
            });
          }
        }
      }}

    >
      {children}
    </AuthContext.Provider>
  )
}