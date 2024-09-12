import React from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, Text } from 'react-native';
import { Input } from 'react-native-elements';

const ModalEstoque = ( 
    {   onRequestClose, title, placeholderQtd, valueQtd, onChangeTextQtd, 
        placeholderMotivo, valueMotivo, onChangeTextMotivo, onPressCancel, onPressConfirm, visible, onPressOut }) => (
    <Modal
    animationType="slide"
    transparent={true}
    visible={visible}
    onRequestClose={onRequestClose}
  >
    <TouchableOpacity 
      style={styles.modalContainer} 
      activeOpacity={1} 
      onPressOut={onPressOut}
    >
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>{title}</Text>

        <Input
          placeholder={placeholderQtd}
          keyboardType="numeric"
          value={valueQtd}
          onChangeText={onChangeTextQtd}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
        />

        <Input
          placeholder={placeholderMotivo}
          keyboardType="default"
          value={valueMotivo}
          onChangeText={onChangeTextMotivo}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
        />

        <View style={styles.modalButtons}>
          <TouchableOpacity style={styles.modalButton} onPress={onPressCancel}>
            <Text style={styles.modalButtonText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalButton} onPress={onPressConfirm}>
            <Text style={styles.modalButtonText}>Confirmar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  </Modal>
);

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
      },
      modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
      },
      modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
      },
      modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
      },
      modalButton: {
        padding: 10,
        margin: 5,
        backgroundColor: '#795548',
        borderRadius: 5,
      },
      modalButtonText: {
        color: 'white',
        fontWeight: 'bold',
      },
      inputContainer: {
        width: '100%',
        marginVertical: 10,
      },
      input: {
        textAlign: 'center',
      },
});

export default ModalEstoque;