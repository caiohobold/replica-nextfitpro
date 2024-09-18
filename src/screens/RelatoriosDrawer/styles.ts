import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
    },
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      height: 80,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      padding: 20
    },
    textContainer: {
      marginLeft: 12,
      flex: 1
    },
    name: {
      fontSize: 18,
      color: '#000',
    },
    subtitle: {
      fontSize: 12
    },
    buttonsContainer: {
      display: 'flex',
      flexDirection: 'row',
      gap: 10,
      alignItems: 'center'
    },
  
  });

  export default styles;
  