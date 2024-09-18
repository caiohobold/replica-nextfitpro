import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles'
import { useEstoqueLista } from '../../hooks/useEstoque';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { MaterialCommunityIcons  } from '@expo/vector-icons';
import LoadingComponent from '../../components/LoadingComponent';
import ModalEstoque from '../../components/ModalEstoque';

export default function Estoque() {

  const {
    estoque,
    loading,
    handleLoadMore,
    handleSubmitAddEstoque,
    handleSubmitRemoveEstoque,
    openModalSaida,
    motivoSaida,
    setMotivoSaida,
    closeModalSaida,
    quantidade,
    setQuantidade,
    modalVisibleEntrada,
    modalVisibleSaida,
    openModalEntrada,
    closeModalEntrada,
    motivoEntrada,
    setMotivoEntrada,
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
          <TouchableOpacity onPress={() => openModalEntrada(item.Id)}>
            <MaterialCommunityIcons name="cart-plus" color="green" size={29}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openModalSaida(item.Id)}>
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
        ListFooterComponent={loading ? <LoadingComponent size="large" color="#795548"/> : null}
      />
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('EstoqueAdd')}
      >
        <Icon name="add" size={30} color="#fff" />
      </TouchableOpacity>

      <ModalEstoque
        title="Entrada de estoque" 
        onRequestClose={closeModalEntrada}
        visible={modalVisibleEntrada}
        onPressOut={closeModalEntrada}
        placeholderQtd="Quantidade"
        valueQtd={quantidade}
        onChangeTextQtd={setQuantidade}
        placeholderMotivo="Motivo"
        valueMotivo={motivoEntrada}
        onChangeTextMotivo={setMotivoEntrada}
        onPressCancel={closeModalEntrada}
        onPressConfirm={handleSubmitAddEstoque}
      />

      <ModalEstoque
        title="Saída de estoque"
        onRequestClose={closeModalSaida}
        visible={modalVisibleSaida}
        onPressOut={closeModalSaida}
        placeholderQtd="Quantidade"
        valueQtd={quantidade}
        onChangeTextQtd={setQuantidade}
        placeholderMotivo="Motivo"
        valueMotivo={motivoSaida}
        onChangeTextMotivo={setMotivoSaida}
        onPressCancel={closeModalSaida}
        onPressConfirm={handleSubmitRemoveEstoque}
      />

    </View>
  );
}
