import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 20,
    },
    floatingButton: {
      position: 'absolute',
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: '#6200EA',
      justifyContent: 'center',
      alignItems: 'center',
      right: 30,
      bottom: 30,
      elevation: 8,
    },
  });

  export default styles;