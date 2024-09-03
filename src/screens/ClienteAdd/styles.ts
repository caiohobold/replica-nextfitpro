import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
    },
    scene: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 20,
    },
    label: {
      fontSize: 14,
      color: '#666',
      marginBottom: 5,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      padding: 10,
      backgroundColor: '#f9f9f9',
      marginBottom: 15,
      fontSize: 16,
    },
    floatingButton: {
      position: 'absolute',
      right: 30,
      bottom: 30,
      backgroundColor: '#32CD32',
      width: 60,
      height: 60,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5,
    },
  });

  export default styles;