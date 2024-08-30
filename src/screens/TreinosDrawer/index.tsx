import { StyleSheet, Text, View } from 'react-native';

export default function Treinos() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Treinos</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  }
});
