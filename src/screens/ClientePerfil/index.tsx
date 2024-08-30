import { StyleSheet, Text, View } from 'react-native';
type PerfilClienteRouteProp = RouteProp<RootStackParamList, 'ClientePerfil'>;
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../routes/stack.routes';

export default function ClientePerfil() {
    const route = useRoute<PerfilClienteRouteProp>();
    const { clienteId, clienteNome } = route.params;
    return (
        <View style={styles.container}>
        <Text style={styles.title}>ID do Cliente: {clienteId}</Text>
        <Text style={styles.title}>Nome do Cliente: {clienteNome}</Text>
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
