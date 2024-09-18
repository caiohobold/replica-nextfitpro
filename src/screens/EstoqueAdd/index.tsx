import { StyleSheet, Text, View } from 'react-native';

export default function EstoqueAdd() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar item ao estoque</Text>
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
