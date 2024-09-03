import { Dimensions, StyleSheet, Text, View, ScrollView } from 'react-native';
import { ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
type PerfilClienteRouteProp = RouteProp<RootStackParamList, 'ClientePerfil'>;
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../routes/stack.routes';
import clienteService from '../../api/services/clientes';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Feather from 'react-native-vector-icons/Feather';

export default function ClientePerfil() {
    const route = useRoute<PerfilClienteRouteProp>();
    const { clienteId } = route.params;
    const [loading, setLoading] = useState<boolean>(true);
    const [cliente, setCliente] = useState<Cliente | null>(null);
    const [resumo, setResumo] = useState<ResumoCliente | null>(null);
    const [index, setIndex] = useState(0);
    const [routes] = useState([
      { key: 'resumo', title: 'Resumo', icon: 'home' },
      { key: 'informacoes', title: 'Informações', icon: 'user' },
      { key: 'endereco', title: 'Endereço', icon: 'map-pin' },
      { key: 'responsavel', title: 'Responsável', icon: 'user-check' },
      //{ key: 'avaliacao', title: 'Avaliação física', icon: 'heart' },
      //{ key: 'evolucao', title: 'Evoluções', icon: 'bar-chart-2' },
      //{ key: 'vendas', title: 'Vendas', icon: 'shopping-cart' },
      //{ key: 'financeiro', title: 'Financeiro', icon: 'dollar-sign' },
      //{ key: 'treinos', title: 'Treinos', icon: 'activity' },
      //{ key: 'mais', title: 'Mais', icon: 'more-horizontal' },
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
                <Text style={styles.saldoValorEmAtraso}>R$ {resumo?.ValorEmAtraso?.toFixed(2) || "0,00"}</Text>
                <Text style={styles.saldoLabel}>EM ATRASO</Text>
            </View>
            <View style={styles.saldoItem}>
                <Text style={styles.saldoValorCredito}>R$ {resumo?.ValorCredito?.toFixed(2) || "0,00"}</Text>
                <Text style={styles.saldoLabel}>CRÉDITO</Text>
            </View>
        </View>
    
        <View style={styles.contratosContainer}>
            <Text style={styles.sectionTitle}>Contratos ativos</Text>
            {resumo?.Contratos && resumo.Contratos.length > 0 ? (
              resumo?.Contratos?.map((contrato) => (
                <View key={contrato.Id} style={styles.contratoItem}>
                    <Text style={styles.contratoDescricao}>{contrato.Descricao}</Text>
                    <Text style={styles.contratoValidade}>Válido até {new Date(contrato.DataValidade).toLocaleDateString()}</Text>
                </View>
            ))
           ) : (
            <Text style={styles.alertaTexto}>Nenhum contrato ativo encontrado.</Text>
            )}
        </View>
    
        <View style={styles.sobreContainer}>
            <Text style={styles.sectionTitle}>Motivos de bloqueio</Text>
            {resumo?.Alertas && resumo.Alertas.length > 0 ? (
                resumo.Alertas.map((alerta, index) => (
                    <View key={index} style={styles.alertaItem}>
                        <Text style={styles.alertaTexto}>{alerta.Motivo}</Text>
                    </View>
                ))
            ) : (
                <Text style={styles.alertaTexto}>Nenhum motivo de bloqueio encontrado.</Text>
            )}
        </View>
      </ScrollView>
    );

    const Informacoes = () => (
      <ScrollView style={styles.scene}>
        <Text style={styles.sectionTitle}>Informações</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nome completo</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.input}>{cliente?.Nome || "Nome não disponível"}</Text>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Data de nascimento</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.input}>
              {cliente?.DataNascimento ? new Date(cliente.DataNascimento).toLocaleDateString() : "Data não disponível"}
            </Text>
            <Feather name="calendar" size={20} color="#666" />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Sexo</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.input}>{cliente?.Sexo === 1 ? 'Masculino' : 'Feminino'}</Text>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Telefone</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.input}>{cliente?.Fone || "Telefone não disponível"}</Text>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>E-mail</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.input}>{cliente?.Email || "E-mail não disponível"}</Text>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>CPF</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.input}>{cliente?.Cpf || "CPF não disponível"}</Text>
          </View>
        </View>

      </ScrollView>
    );

    const Endereco = () => (
      <ScrollView style={styles.scene}>
        <Text style={styles.sectionTitle}>Endereço</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>CEP</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.input}>{cliente?.Cep || "CEP não disponível"}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.halfInputGroup}>
            <Text style={styles.label}>Endereço</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.input}>{cliente?.Endereco || "Endereço não disponível"}</Text>
            </View>
          </View>
          <View style={styles.halfInputGroup}>
            <Text style={styles.label}>Número</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.input}>{cliente?.NumEndereco || "Número não disponível"}</Text>
            </View>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Complemento</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.input}>{cliente?.CompleEndereco || "Complemento não disponível"}</Text>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Bairro</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.input}>{cliente?.Bairro || "Bairro não disponível"}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.halfInputGroup}>
            <Text style={styles.label}>Cidade</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.input}>{cliente?.Cidade?.Descricao || "Cidade não disponível"}</Text>
            </View>
          </View>
          <View style={styles.halfInputGroup}>
            <Text style={styles.label}>Estado</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.input}>{cliente?.Cidade?.Uf || "Estado não disponível"}</Text>
            </View>
          </View>
        </View>

      </ScrollView>
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
        renderTabBar={props => 
        <TabBar
          {...props} 
          scrollEnabled={false}
          labelStyle={{ fontSize: 9 }} 
          style={{ backgroundColor: '#FFFFFF' }} 
          indicatorStyle={{ backgroundColor: '#6200ea' }} 
          inactiveColor="#808080" 
          activeColor="#6200ea"
          tabStyle={{ flex: 1, minWidth: 20 }}
          renderIcon={({ route, focused, color }) => (
            <Feather
              name={route.icon}
              size={25}
              color={color}
            />
          )}
          />}
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
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'black',
    padding: 15
  },
  saldoItem: {
    alignItems: 'center',
  },
  saldoValor: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  saldoValorEmAtraso: {
    color: 'red',
    fontSize: 17,
    fontWeight: 'bold',
  },
  saldoValorCredito: {
    color: 'green',
    fontSize: 17,
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
  scene: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  halfInputGroup: {
    flex: 1,
    marginRight: 10,
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
