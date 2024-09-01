import { Dimensions, StyleSheet, Text, View, ScrollView } from 'react-native';
import { ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
type PerfilClienteRouteProp = RouteProp<RootStackParamList, 'ClientePerfil'>;
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../routes/stack.routes';
import clienteService from '../../api/services/clientes';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

export default function ClientePerfil() {
    const route = useRoute<PerfilClienteRouteProp>();
    const { clienteId } = route.params;
    const [loading, setLoading] = useState<boolean>(true);
    const [cliente, setCliente] = useState<Cliente | null>(null);
    const [resumo, setResumo] = useState<ResumoCliente | null>(null);
    const [index, setIndex] = useState(0);
    const [routes] = useState([
      { key: 'resumo', title: 'Resumo' },
      { key: 'informacoes', title: 'Informações' },
      { key: 'endereco', title: 'Endereço' },
      { key: 'responsavel', title: 'Responsável' },
    ]);


    const fetchCliente = async () => {
      try {
        const responseCliente = await clienteService.listarCliente(clienteId);
        const responseResumo = await clienteService.recuperarResumo(clienteId);
        console.log("Cliente: ", responseCliente.data.Content[0]);
        console.log("Resumo: ", responseResumo.data.Content);
        setCliente(responseCliente.data.Content[0]);
        setResumo(responseResumo.data.Content);
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
      } finally {
        setLoading(false);
      }
    };

    useFocusEffect(
      React.useCallback(() => {
        setLoading(true); 
        fetchCliente();
      }, [])
    );

    if (loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }

    const getStatusText = (status: number | undefined): string => {
      switch (status) {
        case 1:
          return "Ativo";
        case 2:
          return "Bloqueado";
        case 3:
          return "Inativo";
        case 4:
          return "Suspenso";
        default:
          return "Status desconhecido";
      }
    };

    const getStatusColor = (status: number | undefined): string => {
      switch (status) {
        case 1:
          return "green";
        case 2:
          return "red";
        case 3:
          return "gray"; 
        case 4:
          return "orange";
        default:
          return "black"; 
      }
    };

    const Resumo = () => (
      <ScrollView style={styles.scene}>
        <View style={styles.header}>
            <View style={styles.avatarContainer}>
                <Text style={styles.avatarText}>{cliente?.Nome ? cliente.Nome.charAt(0).toUpperCase() : 'N/A'}</Text>
            </View>
            <View style={styles.headerDetails}>
                <Text style={styles.nome}>{cliente?.Nome}</Text>
                <Text style={[styles.status, { color: getStatusColor(cliente?.ClienteParametro.Status) }]}>
                  {getStatusText(cliente?.ClienteParametro.Status)}
                </Text>
                <Text style={styles.sexo}>{cliente?.Sexo === 1 ? 'Masculino' : 'Feminino'}</Text>
            </View>
        </View>
    
        <View style={styles.saldoContainer}>
            <View style={styles.saldoItem}>
                <Text style={styles.saldoValor}>R$ {resumo?.ValorSaldoDevedor?.toFixed(2) || "0,00"}</Text>
                <Text style={styles.saldoLabel}>SALDO DEVEDOR</Text>
            </View>
            <View style={styles.saldoItem}>
                <Text style={styles.saldoValor}>R$ {resumo?.ValorEmAtraso?.toFixed(2) || "0,00"}</Text>
                <Text style={styles.saldoLabel}>EM ATRASO</Text>
            </View>
            <View style={styles.saldoItem}>
                <Text style={styles.saldoValor}>R$ {resumo?.ValorCredito?.toFixed(2) || "0,00"}</Text>
                <Text style={styles.saldoLabel}>CRÉDITO</Text>
            </View>
        </View>
    
        <View style={styles.contratosContainer}>
            <Text style={styles.sectionTitle}>Contratos ativos</Text>
            {resumo?.Contratos?.map((contrato) => (
                <View key={contrato.Id} style={styles.contratoItem}>
                    <Text style={styles.contratoDescricao}>{contrato.Descricao}</Text>
                    <Text style={styles.contratoValidade}>Válido até {new Date(contrato.DataValidade).toLocaleDateString()}</Text>
                </View>
            ))}
        </View>
    
        <View style={styles.sobreContainer}>
            <Text style={styles.sectionTitle}>Sobre</Text>
            {resumo?.Alertas?.map((alerta, index) => (
                <View key={index} style={styles.alertaItem}>
                    <Text style={styles.alertaTexto}>{alerta.Motivo}</Text>
                </View>
            ))}
        </View>
      </ScrollView>
    );

    const Informacoes = () => (
      <View style={styles.scene}>
        <Text style={styles.title}>Nome: {cliente?.Nome || "Nome não disponível"}</Text>
        <Text style={styles.title}>Sexo: {cliente?.Sexo === 1 ? 'Masculino' : 'Feminino'}</Text>
        <Text style={styles.title}>Telefone: {cliente?.Fone || "Telefone não disponível"}</Text>
      </View>
    );

    const Endereco = () => (
      <View style={styles.scene}>
        <Text style={styles.title}>Endereço: {cliente?.Endereco || "Endereço não disponível"}</Text>
        <Text style={styles.title}>Bairro: {cliente?.Bairro || "Bairro não disponível"}</Text>
        <Text style={styles.title}>CEP: {cliente?.Cep || "CEP não disponível"}</Text>
        {cliente && cliente.Cidade ? (
          <Text style={styles.title}>Cidade: {cliente.Cidade.Descricao}, {cliente.Cidade.Uf}</Text>
        ) : (
          <Text style={styles.title}>Cidade não disponível</Text>
        )}
      </View>
    );

    const Responsavel = () => (
      <View style={styles.scene}>
        {cliente && cliente.ClienteResponsavel ? (
          <Text style={styles.title}>Responsável: {cliente.ClienteResponsavel.Nome}</Text>
        ) : (
          <Text style={styles.title}>Sem responsável</Text>
        )}
      </View>
    );
    
    const renderScene = SceneMap({
      resumo: Resumo,
      informacoes: Informacoes,
      endereco: Endereco,
      responsavel: Responsavel,
    });

    return (
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get('window').width }}
        renderTabBar={props => <TabBar {...props} indicatorStyle={{ backgroundColor: '#6200ea' }} />}
      />
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scene: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 18,
    marginVertical: 10,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#6200ea',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerDetails: {
    marginLeft: 15,
    justifyContent: 'center',
  },
  nome: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  status: {
    color: 'red',
    fontWeight: 'bold',
  },
  sexo: {
    fontSize: 16,
    color: '#666',
  },
  saldoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  saldoItem: {
    alignItems: 'center',
  },
  saldoValor: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  saldoLabel: {
    fontSize: 14,
    color: '#666',
  },
  contratosContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  contratoItem: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  contratoDescricao: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  contratoValidade: {
    fontSize: 14,
    color: '#666',
  },
  sobreContainer: {
    marginBottom: 20,
  },
  alertaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  alertaTexto: {
    fontSize: 14,
    color: '#666',
  },
});
