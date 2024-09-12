import { Dimensions, Text, View, ScrollView, TouchableOpacity, Animated } from 'react-native';
import React from 'react';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Feather from 'react-native-vector-icons/Feather';
import styles from './styles';
import { useLeadPerfil } from '../../hooks/useLeads';
import LoadingComponent from '../../components/LoadingComponent';

export default function LeadPerfil() {
    const {
        lead,
        oportunidade,
        atividades,
        loading,
        routes,
        index,
        setIndex,
        toggleMenu,
        expanded,
        animation,
        handleConcluiAtividade,
        handleRemoveAtividade,
        loadingConcluir,
        loadingRemover
    } = useLeadPerfil();


    if (loading) {
      return (
        <View style={styles.container}>
          <LoadingComponent size="large" color="#0000ff" />
        </View>
      );
    }
    const Resumo = () => (
      <ScrollView style={styles.scene}>
        <View style={styles.header}>
            <View style={styles.avatarContainer}>
                <Text style={styles.avatarText}>{lead?.Nome ? lead.Nome.charAt(0).toUpperCase() : 'N/A'}</Text>
            </View>
            <View style={styles.headerDetails}>
                <Text style={styles.nome}>{lead?.Nome}</Text>
                <Text style={styles.sexo}>{lead?.Sexo === 1 ? 'Masculino' : 'Feminino'}</Text>
            </View>
        </View>
        
        <View>
            <Text style={styles.sectionTitle}>Oportunidades abertas</Text>
            {oportunidade?.Content && oportunidade.Content.length > 0 ? (
              oportunidade?.Content?.map((oportunidade) => (
                <View key={oportunidade.Id} style={styles.oportunidadeItem}>
                    <Text style={styles.oportunidadeDescricao}>{oportunidade.Descricao}</Text>
                    <Text style={styles.oportunidadeCriacao}>Criado em {new Date(oportunidade.DataCriacao).toLocaleDateString()}</Text>
                </View>
            ))
           ) : (
            <Text style={styles.alertaTexto}>Nenhuma oportunidade aberta encontrada.</Text>
            )}
        </View>
        <View>
        <Text style={styles.sectionTitle}>Atividades</Text>
        {atividades?.Content && atividades.Content.length > 0 ? (
            atividades?.Content?.map((atividade) => {
            const dataPrevista = new Date(atividade.DataHoraPrevista);
            const hoje = new Date();
            const atrasada = dataPrevista < hoje;

            return (
                <TouchableOpacity key={atividade.Id} style={styles.atividadeItem} onPress={() => toggleMenu(atividade.Id)}>
                    <View style={styles.atividadeInfo}>
                        <View>
                            <Text style={styles.oportunidadeDescricao}>{atividade.Assunto}</Text>
                            <Text style={styles.oportunidadeCriacao}>
                                {atividade.TipoAtividade.Descricao}, {dataPrevista.toLocaleDateString()}
                            </Text>
                            {atrasada && (
                                <Text style={styles.alertaAtrasado}>Atividade atrasada</Text>
                            )}
                        </View>
                        <TouchableOpacity onPress={() => toggleMenu(atividade.Id)}>
                            <Feather name="more-horizontal" size={25} color="#000" />
                        </TouchableOpacity>
                    </View>

                    {expanded === atividade.Id && (
                        <Animated.View style={[styles.menuContainer, { height: animation }]}>
                            <TouchableOpacity style={styles.menuButtonRemover} onPress={() => handleRemoveAtividade(atividade.Id)}>
                                <Text style={styles.menuText}>REMOVER</Text>
                                {loadingRemover[atividade.Id] && <LoadingComponent size="small" color="#fff" />}
                            </TouchableOpacity>
                                <TouchableOpacity style={styles.menuButtonConcluir} onPress={() => handleConcluiAtividade(atividade.Id)}>
                                <Text style={styles.menuText}>CONCLUIR</Text>
                                {loadingConcluir[atividade.Id] && <LoadingComponent size="small" color="#fff" />}
                            </TouchableOpacity>
                        </Animated.View>
                    )}
                </TouchableOpacity>
            );
            })
        ) : (
            <Text style={styles.alertaTexto}>Nenhuma atividade encontrada.</Text>
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
            <Text style={styles.input}>{lead?.Nome || "Nome não disponível"}</Text>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Data de nascimento</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.input}>
              {lead?.DataNascimento ? new Date(lead.DataNascimento).toLocaleDateString() : "Data não disponível"}
            </Text>
            <Feather name="calendar" size={20} color="#666" />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Sexo</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.input}>{lead?.Sexo === 1 ? 'Masculino' : 'Feminino'}</Text>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Telefone</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.input}>{lead?.Fone || "Telefone não disponível"}</Text>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>E-mail</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.input}>{lead?.Email || "E-mail não disponível"}</Text>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>CPF</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.input}>{lead?.Cpf || "CPF não disponível"}</Text>
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
            <Text style={styles.input}>{lead?.Cep || "CEP não disponível"}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.halfInputGroup}>
            <Text style={styles.label}>Endereço</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.input}>{lead?.Endereco || "Endereço não disponível"}</Text>
            </View>
          </View>
          <View style={styles.halfInputGroup}>
            <Text style={styles.label}>Número</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.input}>{lead?.NumEndereco || "Número não disponível"}</Text>
            </View>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Complemento</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.input}>{lead?.CompleEndereco || "Complemento não disponível"}</Text>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Bairro</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.input}>{lead?.Bairro || "Bairro não disponível"}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.halfInputGroup}>
            <Text style={styles.label}>Cidade</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.input}>{lead?.Cidade?.Descricao || "Cidade não disponível"}</Text>
            </View>
          </View>
          <View style={styles.halfInputGroup}>
            <Text style={styles.label}>Estado</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.input}>{lead?.Cidade?.Uf || "Estado não disponível"}</Text>
            </View>
          </View>
        </View>

      </ScrollView>
    );

    
    const renderScene = SceneMap({
      resumo: Resumo,
      informacoes: Informacoes,
      endereco: Endereco,
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
          indicatorStyle={{ backgroundColor: '#EF6C00' }} 
          inactiveColor="#808080" 
          activeColor="#EF6C00"
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
