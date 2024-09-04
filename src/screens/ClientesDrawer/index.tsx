import { Text, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles'
import { useClientesLista } from '../../hooks/useClientes';

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
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const renderItem = ({ item }: { item: Cliente }) => {
    const statusColor = renderStatusColor(item.ClienteParametro.Status);
    const sexoCadastro = renderSexo(item.Sexo);
    const inicial = item.Nome.charAt(0).toUpperCase();

    return (
      <TouchableOpacity 
        style={styles.itemContainer}
        onPress={() => navigation.navigate('ClientePerfil', { clienteId: item.Id, clienteNome: item.Nome })} 
      >
        <View style={styles.circleContainer}>
          <View style={styles.circle}>
            <Text style={styles.initial}>{inicial}</Text>
            <View style={[styles.statusCircle, { backgroundColor: statusColor }]} />
          </View>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.Nome}</Text>
          <Text style={styles.sexoText}>{sexoCadastro}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={clientes}
        keyExtractor={(item) => item.Id.toString()}
        renderItem={renderItem}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
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