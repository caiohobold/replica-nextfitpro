import { Dimensions, Text, View, ScrollView } from 'react-native';
import { ActivityIndicator } from 'react-native';
import React from 'react';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Feather from 'react-native-vector-icons/Feather';
import styles from './styles';
import { useClientePerfil } from '../../hooks/useClientes';

export default function ClientePerfil() {
    const {
      cliente,
      getStatusColor,
      getStatusText,
      loading,
      resumo,
      routes,
      index,
      setIndex,
    } = useClientePerfil();

    if (loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
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
          renderIcon={({ route, color }) => (
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
