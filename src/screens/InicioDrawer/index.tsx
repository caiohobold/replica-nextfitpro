import { Text, View } from 'react-native';
import useLogin from '../../hooks/useLogin';
import { useEffect } from 'react';
import styles from './styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes/stack.routes';
import { useNavigation } from '@react-navigation/native';
import Greeting from '../../components/Greeting';
import DashboardBox from '../../components/DashBoardBox';

export default function Inicio() {

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { 
    userInfo, 
    updateUserInfo, 
    getGreeting, 
    fetchQuantClientesAtivos, 
    quantClientesAtivos, 
    quantClientesNovos, 
    receberHoje, 
    fetchReceberHoje,
    fetchPagarHoje,
    pagarHoje,
  } = useLogin();

  useEffect(() => {
    updateUserInfo();
    fetchQuantClientesAtivos();
    fetchReceberHoje();
    fetchPagarHoje();
  }, []);

  return (
    <View style={styles.container}>
      <Greeting userInfo={userInfo} getGreeting={getGreeting}/>

      <View style={styles.containerDashboard}>
        <Text style={styles.titleDashboard}>Dashboard</Text>
        <View style={styles.rowDashBoard1}>
          <DashboardBox
            title='CLIENTES ATIVOS'
            value={quantClientesAtivos?.toString() ?? 'Carregando...'}
            onPress={() => navigation.navigate('ClienteLista')}
          />

          <DashboardBox
            title='NOVOS CLIENTES'
            value={quantClientesNovos?.toString() ?? '0'}
            onPress={() => navigation.navigate('ClienteLista')}
          />
        </View>

        <View style={styles.rowDashBoard1}>
          <DashboardBox
            title='A RECEBER HOJE'
            value={`R$${receberHoje?.toFixed(2) ?? '0,00'}`}
            color="green"
            onPress={() => navigation.navigate('RelatorioReceita')}
          />
          
          <DashboardBox
            title='A PAGAR HOJE'
            value={`R$${pagarHoje?.toFixed(2) ?? '0,00'}`}
            color="red"
          />
        </View>
      </View>
    </View>
);
}
