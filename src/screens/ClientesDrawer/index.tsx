import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import clienteListaService from '../../api/services/clientesLista';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes/stack.routes';

export default function Clientes() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  

  const fetchClientes = async () => {
    try {
      const response = await clienteListaService.recuperarPesquisaGeral();
      const data: Cliente[] = response.data.Content;
      console.log('Data:', data);
      setClientes(data);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true); 
      fetchClientes();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const renderStatusColor = (status: number) => {
    switch (status) {
      case 1:
        return '#00FF00'; // Verde para Ativo
      case 2:
        return '#FF0000'; // Vermelho para Bloqueado
      case 3:
        return '#808080'; // Cinza para Inativo
      case 4:
        return '#FFFF00'; // Amarelo para Suspenso
      default:
        return '#000000'; // Preto para Desconhecido
    }
  };

  const renderSexo = (status: number) => {
    switch (status) {
      case 1:
        return 'Masculino'; // Verde para Ativo
      case 2:
        return 'Feminino'; // Vermelho para Bloqueado
      default:
        return null; // Preto para Desconhecido
    }
  };

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
      <Text style={styles.title}>Clientes</Text>
      <FlatList
        data={clientes}
        keyExtractor={(item) => item.Id.toString()}
        renderItem={renderItem}
      />

      <TouchableOpacity
        style={styles.floatingButton}
      >
        <Icon name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    height: 80,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  circleContainer: {
    marginRight: 15,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#6200EA', // Cor de fundo do círculo (roxo)
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  initial: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  statusCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    position: 'absolute',
    bottom: 4,
    right: 4,
    borderWidth: 2,
    borderColor: '#fff',
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    color: '#000',
  },
  sexoText: {
    fontSize: 14,
    color: '#666',
  },
  floatingButton: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#6200EA',
    justifyContent: 'center',
    alignItems: 'center',
    right: 30,
    bottom: 30,
    elevation: 8,
  },
});