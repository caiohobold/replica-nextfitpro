import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
      backgroundColor: '#23282B',
    },
    logo: {
      width: 500,
      height: 250,
      marginTop: -60, 
      marginBottom: 30, 
      resizeMode: 'contain',
    },
    input: {
      color: 'white',
      fontSize: 18,
      width: '100%',
      height: 50,
      borderColor: '#93039D',
      borderWidth: 1,
      marginBottom: 12,
      paddingHorizontal: 8,
      borderRadius: 4,
    },
    text: {
      fontSize: 18,
      color: 'white',
      fontWeight: 'bold'
    },
    button: {
      width: '100%',
      backgroundColor: '#93039D', 
      paddingVertical: 10,
      alignItems: 'center',
      borderRadius: 44 / 2, 
      marginTop: 20,
      height: 50,
      justifyContent: 'center'
    },
    buttonText: {
      color: '#fff', 
      fontSize: 16, 
      fontWeight: 'bold',
    },
  });

export default styles;
