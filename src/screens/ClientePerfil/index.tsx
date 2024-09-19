import { Dimensions, Text, View, ScrollView } from 'react-native';
import React from 'react';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Feather from 'react-native-vector-icons/Feather';
import styles from './styles';
import { useClientePerfil } from '../../hooks/useClientes';
import LoadingComponent from '../../components/LoadingComponent';
import Resumo from '../../components/ClientePerfil/Resumo';
import Informacoes from '../../components/ClientePerfil/Informacoes';
import Endereco from '../../components/ClientePerfil/Endereco';
import Responsavel from '../../components/ClientePerfil/Responsavel';

export default function ClientePerfil() {
    const {
      loading,
      routes,
      index,
      setIndex,
    } = useClientePerfil();

    if (loading) {
      return (
        <View style={styles.container}>
          <LoadingComponent size="large" color="#0000ff" />
        </View>
      );
    }
    
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
