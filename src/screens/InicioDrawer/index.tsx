import { Text, TouchableOpacity, View } from 'react-native';
import useLogin from '../../hooks/useLogin';
import { useEffect } from 'react';
import styles from './styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes/stack.routes';
import { useNavigation } from '@react-navigation/native';

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

  const nomes = userInfo?.Nome ? userInfo.Nome.split(' ') : [];
  const inicial = nomes.length > 0 ? nomes[0].charAt(0).toUpperCase() : '';
  const secondInicial = nomes.length > 1 ? nomes[nomes.length - 1].charAt(0).toUpperCase() : '';

  return (
    <View style={styles.container}>
      <View style={styles.containerGreeting}>
        <View style={styles.circleContainer}>
          <View style={styles.circle}>
            <Text style={styles.initial}>{inicial}{secondInicial}</Text>
          </View>
        </View>
        <View style={styles.textGreeting}>
          <Text style={styles.title}>
              {getGreeting()}
          </Text>
          <Text style={styles.titleName}>
              {userInfo ? `${userInfo.Nome}` : 'Carregando...'}
          </Text>
        </View>
      </View>

      <View style={styles.containerDashboard}>
        <Text style={styles.titleDashboard}>Dashboard</Text>
        <View style={styles.rowDashBoard1}>
          <TouchableOpacity style={styles.boxDashboard} onPress={() => navigation.navigate('ClienteLista')}>
            <Text style={styles.titleBoxDashboard}>CLIENTES ATIVOS:</Text>
            <Text style={styles.textBoxDashboard}>{quantClientesAtivos ?? 'Carregando...'}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.boxDashboard} onPress={() => navigation.navigate('ClienteLista')}>
            <Text style={styles.titleBoxDashboard}>NOVOS CLIENTES:</Text>
            <Text style={styles.textBoxDashboard}>{quantClientesNovos ?? '0'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.rowDashBoard1}>
          <TouchableOpacity style={styles.boxDashboard} onPress={() => navigation.navigate('RelatorioReceita')}>
            <Text style={styles.titleBoxDashboard}>A RECEBER HOJE:</Text>
            <Text style={styles.textBoxDashboardReceber}>{receberHoje ? `R$${receberHoje.toFixed(2)}` : 'R$0,00'}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.boxDashboard}>
            <Text style={styles.titleBoxDashboard}>A PAGAR HOJE:</Text>
            <Text style={styles.textBoxDashboardPagar}>{pagarHoje ? `R$${pagarHoje.toFixed(2)}` : 'R$0,00'}</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
);
}
