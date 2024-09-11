import { ActivityIndicator, FlatList, Modal, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles'
import { useEstoqueLista } from '../../hooks/useEstoque';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { MaterialCommunityIcons  } from '@expo/vector-icons';
import { useState } from 'react';
import { Input } from 'react-native-elements';

export default function Estoque() {

  const {
    estoque,
    loading,
    handleLoadMore,
    handleSubmit,
    quantidade,
    setQuantidade,
    modalVisible,
    openModal,
    closeModal,
    motivo,
    setMotivo,
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
          <TouchableOpacity onPress={() => openModal(item.Id)}>
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


      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal} // Para fechar ao pressionar "voltar"
      >
        <TouchableOpacity 
          style={styles.modalContainer} 
          activeOpacity={1} 
          onPressOut={closeModal}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Adicionar ao Carrinho</Text>

            {/* Input numérico */}
            <Input
              placeholder="Quantidade"
              keyboardType="numeric"
              value={quantidade}
              onChangeText={setQuantidade}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
            />

            <Input
              placeholder="Motivo"
              keyboardType="default"
              value={motivo}
              onChangeText={setMotivo}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={handleSubmit}>
                <Text style={styles.modalButtonText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>


    </View>
  );
}
