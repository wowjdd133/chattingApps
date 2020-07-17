import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

const Loading = () => {
  return(
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#6646ee"/>
    </View>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Loading;