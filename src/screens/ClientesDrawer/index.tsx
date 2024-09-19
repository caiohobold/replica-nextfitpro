import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles'
import { useClientesLista } from '../../hooks/useClientes';
import LoadingComponent from '../../components/LoadingComponent';
import ClienteItem from '../../components/ClienteItem';

export default function Clientes() {
  const {
    clientes,
    loading,
    renderSexo,
    renderStatusColor,
    handleLoadMore,
    navigation
  } = useClientesLista();
  const [page, setPage] = useState<number>(1);


  if (loading && page === 1) {
    return (
      <View style={styles.container}>
        <LoadingComponent size="large" color="#0000ff" />
      </View>
    );
  }

  const handleNavigateToClientePerfil = (clienteId: number, clienteNome: string) => {
    navigation.navigate('ClientePerfil', { clienteId, clienteNome });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={clientes}
        keyExtractor={(item) => item.Id.toString()}
        renderItem={({ item }) => (
          <ClienteItem
            cliente={item}
            onPress={handleNavigateToClientePerfil}
            renderSexo={renderSexo}
            renderStatusColor={renderStatusColor}
          />
        )}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <LoadingComponent size="large" color="#0000ff" /> : null}
      />

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('ClienteAdd')}
      >
        <Icon name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}