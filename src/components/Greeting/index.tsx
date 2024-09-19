import { View, Text, StyleSheet } from "react-native";

export default function Greeting({ userInfo, getGreeting }: { userInfo: any, getGreeting: () => string }) {
    const nomes = userInfo?.Nome ? userInfo.Nome.split(' ') : [];
    const inicial = nomes.length > 0 ? nomes[0].charAt(0).toUpperCase() : '';
    const secondInicial = nomes.length > 1 ? nomes[nomes.length - 1].charAt(0).toUpperCase() : '';
  
    return (
      <View style={styles.containerGreeting}>
        <View style={styles.circleContainer}>
          <View style={styles.circle}>
            <Text style={styles.initial}>{inicial}{secondInicial}</Text>
          </View>
        </View>
        <View style={styles.textGreeting}>
          <Text style={styles.title}>{getGreeting()}</Text>
          <Text style={styles.titleName}>
            {userInfo ? `${userInfo.Nome}` : 'Carregando...'}
          </Text>
        </View>
      </View>
    );
  }

const styles = StyleSheet.create({
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
})