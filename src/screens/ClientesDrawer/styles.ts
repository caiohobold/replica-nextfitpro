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
      backgroundColor: '#6200EA',
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
      flex: 1,
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
      backgroundColor: '#6200EA',
      justifyContent: 'center',
      alignItems: 'center',
      right: 30,
      bottom: 30,
      elevation: 8,
    },
  });

  export default styles;