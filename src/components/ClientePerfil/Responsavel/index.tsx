import { View, Text } from "react-native";
import { useClientePerfil } from "../../../hooks/useClientes";
import styles from "./styles";

export default function Responsavel(){
    const { cliente } = useClientePerfil();

    return(
        <View style={styles.scene}>
        {cliente && cliente.ClienteResponsavel ? (
            <Text style={styles.title}>Responsável: {cliente.ClienteResponsavel.Nome}</Text>
        ) : (
            <Text style={styles.title}>Sem responsável</Text>
        )}
        </View>
    )
}
