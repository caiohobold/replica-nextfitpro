import { ScrollView, Text, View } from "react-native";
import { useClientePerfil } from "../../../hooks/useClientes";
import styles from "./style";
import Feather from 'react-native-vector-icons/Feather';

export default function Informacoes() {
    const { cliente } = useClientePerfil();

    return (
<ScrollView style={styles.scene}>
      <Text style={styles.sectionTitle}>Informações</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Nome completo</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.input}>{cliente?.Nome || "Nome não disponível"}</Text>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Data de nascimento</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.input}>
            {cliente?.DataNascimento ? new Date(cliente.DataNascimento).toLocaleDateString() : "Data não disponível"}
          </Text>
          <Feather name="calendar" size={20} color="#666" />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Sexo</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.input}>{cliente?.Sexo === 1 ? 'Masculino' : 'Feminino'}</Text>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Telefone</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.input}>{cliente?.Fone || "Telefone não disponível"}</Text>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>E-mail</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.input}>{cliente?.Email || "E-mail não disponível"}</Text>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>CPF</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.input}>{cliente?.Cpf || "CPF não disponível"}</Text>
        </View>
      </View>

    </ScrollView>
    )
};