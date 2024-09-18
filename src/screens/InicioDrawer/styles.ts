import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
    },
    containerGreeting: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 30
    },
    textGreeting: {
      display: 'flex',
      flexDirection: 'column'
    },
    title: {
      fontSize: 18,
    },
    titleName: {
      fontSize: 22,
    },
    circleContainer: {
      marginRight: 15,
    },
    circle: {
      width: 45,
      height: 50,
      borderRadius: 25,
      backgroundColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },
    initial: {
      color: 'black',
      fontSize: 30,
      fontWeight: 'bold',
    },
    containerDashboard: {
      marginTop: 40,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    rowDashBoard1: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      marginTop: 15,
      gap: 10
    },
    titleDashboard: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    boxDashboard: {
      backgroundColor: '#ebe8e8',
      width: '45%',
      padding: 12,
      borderRadius: 5,
      shadowColor: '#000', 
      shadowOffset: {
        width: 0,
        height: 2, 
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    titleBoxDashboard: {
      fontSize: 14,
      color: 'black'
    },
    textBoxDashboard: {
      fontSize: 17,
      fontWeight: 'bold',
      color: 'black'
    },
    textBoxDashboardReceber: {
      fontSize: 17,
      fontWeight: 'bold',
      color: 'green'
    },
    textBoxDashboardPagar: {
      fontSize: 17,
      fontWeight: 'bold',
      color: 'red'
    },
    
});

export default styles;