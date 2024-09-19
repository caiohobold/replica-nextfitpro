import { ScrollView, Text, View } from "react-native";
import styles from "./styles";
import { useClientePerfil } from "../../../hooks/useClientes";

export default function Endereco() {

    const { cliente } = useClientePerfil();

    return(
    <ScrollView style={styles.scene}>
      <Text style={styles.sectionTitle}>Endereço</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>CEP</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.input}>{cliente?.Cep || "CEP não disponível"}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.halfInputGroup}>
          <Text style={styles.label}>Endereço</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.input}>{cliente?.Endereco || "Endereço não disponível"}</Text>
          </View>
        </View>
        <View style={styles.halfInputGroup}>
          <Text style={styles.label}>Número</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.input}>{cliente?.NumEndereco || "Número não disponível"}</Text>
          </View>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Complemento</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.input}>{cliente?.CompleEndereco || "Complemento não disponível"}</Text>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Bairro</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.input}>{cliente?.Bairro || "Bairro não disponível"}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.halfInputGroup}>
          <Text style={styles.label}>Cidade</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.input}>{cliente?.Cidade?.Descricao || "Cidade não disponível"}</Text>
          </View>
        </View>
        <View style={styles.halfInputGroup}>
          <Text style={styles.label}>Estado</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.input}>{cliente?.Cidade?.Uf || "Estado não disponível"}</Text>
          </View>
        </View>
      </View>

    </ScrollView>
    )
};