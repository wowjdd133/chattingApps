import React, { useState, createContext } from "react"
import firebase, { auth } from 'firebase';
import * as Facebook from 'expo-facebook';
import { Alert } from "react-native";
import ProfileScreen from "../components/screens/ProfileScreen";

export type Auth = {
  user: any;
  setUser: any;
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
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}