import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 20,
    },
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      height: 80,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    circleContainer: {
      marginRight: 15,
    },
    circle: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: '#EF6C00',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },
    initial: {
      color: '#fff',
      fontSize: 24,
      fontWeight: 'bold',
    },
    statusCircle: {
      width: 12,
      height: 12,
      borderRadius: 6,
      position: 'absolute',
      bottom: 4,
      right: 4,
      borderWidth: 2,
      borderColor: '#fff',
    },
    textContainer: {
      flex: 1
    },
    buttonsContainer: {
      display: 'flex',
      flexDirection: 'row',
      gap: 10,
      alignItems: 'center'
    },
    precoLabel: {
      fontWeight: '500'
    },
    name: {
      fontSize: 18,
      color: '#000',
    },
    sexoText: {
      fontSize: 14,
      color: '#666',
    },
    floatingButton: {
      position: 'absolute',
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: '#795548',
      justifyContent: 'center',
      alignItems: 'center',
      right: 30,
      bottom: 30,
      elevation: 8,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)', // Fundo escurecido
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

  export default styles;