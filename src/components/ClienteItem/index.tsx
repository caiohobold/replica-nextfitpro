import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

interface ClienteItemProps {
  cliente: Cliente;
  onPress: (id: number, nome: string) => void;
  renderSexo: (sexo: number) => string | null;
  renderStatusColor: (status: number) => string;
}

const ClienteItem: React.FC<ClienteItemProps> = ({ cliente, onPress, renderSexo, renderStatusColor }) => {
  const statusColor = renderStatusColor(cliente.ClienteParametro.Status);
  const sexoCadastro = renderSexo(cliente.Sexo);
  const inicial = cliente.Nome.charAt(0).toUpperCase();

  return (
    <TouchableOpacity 
      style={styles.itemContainer}
      onPress={() => onPress(cliente.Id, cliente.Nome)}
    >
      <View style={styles.circleContainer}>
        <View style={styles.circle}>
          <Text style={styles.initial}>{inicial}</Text>
          <View style={[styles.statusCircle, { backgroundColor: statusColor }]} />
        </View>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.name}>{cliente.Nome}</Text>
        <Text style={styles.sexoText}>{sexoCadastro}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
      backgroundColor: '#6200EA',
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
  });

export default ClienteItem;