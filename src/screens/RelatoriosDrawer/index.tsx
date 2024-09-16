import { Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes/stack.routes';
import { useNavigation } from '@react-navigation/native';

export default function Relatorios() {

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <>
      <TouchableOpacity 
        style={styles.itemContainer}
        onPress={() => navigation.navigate('RelatorioReceita')}
      >
        <View style={styles.textContainer}>
          <Text style={styles.name}>Receita</Text>
          <Text style={styles.subtitle}>Veja o valor recebido no mês!</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.itemContainer}
        onPress={() => navigation.navigate('RelatorioAniversariantes')}
      >
        <View style={styles.textContainer}>
          <Text style={styles.name}>Aniversariantes</Text>
          <Text style={styles.subtitle}>Saiba quem está de aniversário!</Text>
        </View>
      </TouchableOpacity>
    </>
  );
}