import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import clienteListaService from '../../api/services/clientesLista';

export default function Clientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await clienteListaService.recuperarPesquisaGeral();
        console.log('Response:', response.data.Content);
        const data: Cliente[] = await response.data.Content;
        console.log('Data:', data);
        setClientes(data);
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClientes();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Clientes</Text>
      <FlatList
        data={clientes}
        keyExtractor={(item) => item.Id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>{item.Nome}</Text>
          </View>
        )}
      />
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
    marginBottom: 20,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
  name: {
    fontSize: 18,
  },
});
