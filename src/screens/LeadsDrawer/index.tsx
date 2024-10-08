import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useLeadsLista } from '../../hooks/useLeads';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LoadingComponent from '../../components/LoadingComponent';

export default function Leads() {
  const {
    leads,
    loading,
    handleLoadMore,
    renderSexo,
    navigation
  } = useLeadsLista();

  const renderItem = ({ item }: { item: Lead }) => {
    const sexoCadastro = renderSexo(item.Sexo);
    const inicial = item.Nome.charAt(0).toUpperCase();

    return (
      <TouchableOpacity 
        style={styles.itemContainer}
        onPress={() => navigation.navigate('LeadPerfil', { leadId: item.Id, leadNome: item.Nome })} 
      >
        <View style={styles.circleContainer}>
          <View style={styles.circle}>
            <Text style={styles.initial}>{inicial}</Text>
          </View>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.Nome}</Text>
          <Text style={styles.sexoText}>{sexoCadastro}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={leads}
        keyExtractor={(item) => item.Id.toString()}
        renderItem={renderItem}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <LoadingComponent size="large" color="#EF6C00" /> : null}
      />

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('LeadAdd')}
      >
        <Icon name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}