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
    dataNasc: {
        fontSize: 15,
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'right'
    },
    nascLabel: {
        fontSize: 15,
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'left'
    },
    switchContainer: {
        flexDirection: 'row',      
        alignItems: 'center',     
        justifyContent: 'space-between', 
        paddingHorizontal: 10,     
        paddingVertical: 5,        
        backgroundColor: '#f2f2f2', 
        marginVertical: 10,        
        borderRadius: 5,           
      },
      switchLabel: {
        fontSize: 16,              
        color: '#333',             
        fontWeight: '500',         
      }
  });

  export default styles;