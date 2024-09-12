import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons  } from '@expo/vector-icons';
import LoadingComponent from '../../../components/LoadingComponent';
import { useState } from 'react';

export default function RelatorioReceita() {

  const [loading, setLoading] = useState<boolean>(false);

  return (
    <>
      <Text>Relatório de receita</Text>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    height: 80,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 20
  },
  textContainer: {
    flex: 1
  },
  name: {
    fontSize: 18,
    color: '#000',
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center'
  },

});
