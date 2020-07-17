import React from 'react';
import { AppRegistry, Text } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import './config/firebaseConfig'; // 지우지말기.
import { expo } from './app.json';
import Navigation from './components/navigations';
import { AuthProvider } from './providers/AuthProvider';

export default function App() {
  return (
    <PaperProvider>
      <AuthProvider>
          <Navigation />
      </AuthProvider>
    </PaperProvider>
  )
}

AppRegistry.registerComponent(expo.name, () => App);