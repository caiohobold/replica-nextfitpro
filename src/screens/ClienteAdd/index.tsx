import React, { useState } from 'react';
import { Text, TextInput, ScrollView, Alert, Dimensions, TouchableOpacity } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import Feather from 'react-native-vector-icons/Feather';
import clienteService from '../../api/services/clientes';
import styles from './styles'
import { useClienteAdd } from '../../hooks/useClientes';


export default function ClienteAdd() {
  const {
    form,
    handleInputChange,
    handleSubmit,
    index,
    setIndex,
    routes
  } = useClienteAdd();

  const renderTabContent = () => {
    switch (index) {
      case 0: 
        return (
          <ScrollView style={styles.scene}>
            <Text style={styles.label}>Nome completo</Text>
            <TextInput
              style={styles.input}
              value={form.nome}
              onChangeText={(value) => handleInputChange('nome', value)}
            />

            <Text style={styles.label}>Data de nascimento</Text>
            <TextInput
              style={styles.input}
              value={form.dataNascimento}
              onChangeText={(value) => handleInputChange('dataNascimento', value)}
              placeholder="AAAA-MM-DD"
            />

            <Text style={styles.label}>Sexo</Text>
            <TextInput
              style={styles.input}
              value={form.sexo.toString()}
              onChangeText={(value) => handleInputChange('sexo', Number(value))}
              placeholder="Digite 1 para Masculino ou 2 para Feminino"
            />

            <Text style={styles.label}>Objetivo</Text>
            <TextInput
              style={styles.input}
              value={form.objetivo.toString()}
              onChangeText={(value) => handleInputChange('objetivo', Number(value))}
              placeholder="Digite o código do objetivo"
            />

            <Text style={styles.label}>Celular</Text>
            <TextInput
              style={styles.input}
              value={form.celular}
              onChangeText={(value) => handleInputChange('celular', value)}
              keyboardType="numeric"
            />

            <Text style={styles.label}>E-mail</Text>
            <TextInput
              style={styles.input}
              value={form.email}
              onChangeText={(value) => handleInputChange('email', value)}
              keyboardType="email-address"
            />

            <Text style={styles.label}>CPF</Text>
            <TextInput
              style={styles.input}
              value={form.cpf}
              onChangeText={(value) => handleInputChange('cpf', value)}
              keyboardType="numeric"
            />
          </ScrollView>
        )

      case 1:
        return (
          <ScrollView style={styles.scene}>
            <Text style={styles.label}>CEP</Text>
            <TextInput
              style={styles.input}
              value={form.cep}
              onChangeText={(value) => handleInputChange('cep', value)}
              keyboardType="numeric"
            />

            <Text style={styles.label}>Endereço</Text>
            <TextInput
              style={styles.input}
              value={form.endereco}
              onChangeText={(value) => handleInputChange('endereco', value)}
            />

            <Text style={styles.label}>Número</Text>
            <TextInput
              style={styles.input}
              value={form.numEndereco}
              onChangeText={(value) => handleInputChange('numEndereco', value)}
              keyboardType="numeric"
            />

            <Text style={styles.label}>Complemento</Text>
            <TextInput
              style={styles.input}
              value={form.complemento}
              onChangeText={(value) => handleInputChange('complemento', value)}
            />

            <Text style={styles.label}>Bairro</Text>
            <TextInput
              style={styles.input}
              value={form.bairro}
              onChangeText={(value) => handleInputChange('bairro', value)}
            />
          </ScrollView>
        )
      case 2:
        return (
          <ScrollView style={styles.scene}>
            <Text style={styles.label}>Nome do Responsável</Text>
            <TextInput
              style={styles.input}
              value={form.codigoClienteResponsavel.toString()}
              onChangeText={(value) => handleInputChange('codigoClienteResponsavel', Number(value))}
            />
          </ScrollView>
        )
      
      case 3:
        return (
          <ScrollView style={styles.scene}>
            <Text style={styles.label}>Outras informações</Text>
          </ScrollView>
        )
      
      default:
        return null
    }
  }
  
  return (
    <>
      <TabView
        lazy
        lazyPreloadDistance={1}
        navigationState={{ index, routes }}
        renderScene={renderTabContent}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get('window').width }}
        renderTabBar={props => (
          <TabBar
            {...props}
            scrollEnabled={false}
            labelStyle={{ fontSize: 9, textAlign: 'center' }}
            style={{ backgroundColor: '#FFFFFF' }}
            indicatorStyle={{ backgroundColor: '#6200ea' }}
            inactiveColor="#808080"
            activeColor="#6200ea"
            tabStyle={{ flex: 1}}
            renderIcon={({ route, focused, color }) => (
              <Feather
                name={route.icon}
                size={25}
                color={color}
              />
            )}
          />
        )}
      />
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={handleSubmit}
      >
        <Feather name="save" size={30} color="#fff" />
      </TouchableOpacity>
    </>
  );
}
