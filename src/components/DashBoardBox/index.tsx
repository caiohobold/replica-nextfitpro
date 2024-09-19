import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

export default function DashboardBox({ title, value, onPress, color }: { title: string, value: string, onPress?: () => void, color?: string }) {
  return (
    <TouchableOpacity style={styles.boxDashboard} onPress={onPress}>
      <Text style={styles.titleBoxDashboard}>{title}</Text>
      <Text style={[styles.textBoxDashboard, { color: color || 'black' }]}>{value}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  boxDashboard: {
    backgroundColor: '#ebe8e8',
    width: '45%',
    padding: 12,
    borderRadius: 5,
    shadowColor: '#000', 
    shadowOffset: {
      width: 0,
      height: 2, 
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  titleBoxDashboard: {
    fontSize: 14,
    color: 'black'
  },
  textBoxDashboard: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black'
  },
})