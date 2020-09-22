import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ChattingScreen from '../screens/ChattingScreen';
import HomeTabs from './HomeTabs';

const ChattingStack = () => {
  
  const Stack = createStackNavigator();

  return(
    <Stack.Navigator>
      <Stack.Screen name="chattingList" component={HomeTabs}/>
      <Stack.Screen name="chatting" component={ChattingScreen}/>
    </Stack.Navigator>
  )
}

export default ChattingStack;