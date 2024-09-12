import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const LoadingComponent = ( { color, size }) => (
  <View style={styles.container}>
    <ActivityIndicator size={size} color={color} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingComponent;