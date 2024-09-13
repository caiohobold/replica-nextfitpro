import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 10
    },
    datasContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 20,
      marginBottom: 10,
    },
    dateButton: {
      backgroundColor: '#EF6C00',
      padding: 10,
      borderRadius: 5,
      width: '45%',
      alignItems: 'center',
    },
    dateButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    datePicker: {
      marginLeft: -10,
    },
    datasLabel: {
      textAlign: 'right'
    },
    valorTotalContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    valorTotalValue: {
      fontSize: 17,
      fontWeight: 'bold'
    },
    valorTotalLabel: {
      fontSize: 16
    },
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 10,
      height: 80,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      padding: 10,
      gap: 10
    },
    textContainer: {
      flex: 1
    },
    name: {
      fontSize: 14,
      color: 'black',
    },
    metodoPagamento: {
      fontSize: 12,
      color: '#000',
    },
  });

  export default styles;