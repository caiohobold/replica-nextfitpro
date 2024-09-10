import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles'
import { useEstoqueLista } from '../../hooks/useEstoque';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Feather, MaterialCommunityIcons  } from '@expo/vector-icons';

export default function Estoque() {

  const {
    estoque,
    loading,
    handleLoadMore,
    navigation
  } = useEstoqueLista();

  const renderItem = ({ item }: { item: Estoque }) => {

    const formatPrice = (price?: number) => {
      return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price ?? 0);
    };

    return (
      <View 
        style={styles.itemContainer}
      >
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.Descricao}</Text>
          <Text>{item.ItemParametro?.QtdeEmEstoque} unidades</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <Text style={styles.precoLabel}>{formatPrice(item.Preco)}</Text>
          <TouchableOpacity>
            <MaterialCommunityIcons name="cart-plus" color="green" size={29}/>
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialCommunityIcons name="cart-off" color="red" size={29}/>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={estoque}
        keyExtractor={(item) => item.Id.toString()}
        renderItem={renderItem}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator size="large" color="#795548" /> : null}
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
