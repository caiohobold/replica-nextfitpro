import { View, ScrollView, Text } from "react-native";
import styles from "./styles";
import { useClientePerfil } from "../../../hooks/useClientes";


export default function Resumo() {

    const {
        cliente,
        getStatusColor,
        getStatusText,
        resumo,
      } = useClientePerfil();
    
    return(
        <ScrollView style={styles.scene}>
      <View style={styles.header}>
          <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>{cliente?.Nome ? cliente.Nome.charAt(0).toUpperCase() : 'N/A'}</Text>
          </View>
          <View style={styles.headerDetails}>
              <Text style={styles.nome}>{cliente?.Nome}</Text>
              <Text style={[styles.status, { color: getStatusColor(cliente?.ClienteParametro.Status) }]}>
                {getStatusText(cliente?.ClienteParametro.Status)}
              </Text>
              <Text style={styles.sexo}>{cliente?.Sexo === 1 ? 'Masculino' : 'Feminino'}</Text>
          </View>
      </View>
  
      <View style={styles.saldoContainer}>
          <View style={styles.saldoItem}>
              <Text style={styles.saldoValor}>R$ {resumo?.ValorSaldoDevedor?.toFixed(2) || "0,00"}</Text>
              <Text style={styles.saldoLabel}>SALDO DEVEDOR</Text>
          </View>
          <View style={styles.saldoItem}>
              <Text style={styles.saldoValorEmAtraso}>R$ {resumo?.ValorEmAtraso?.toFixed(2) || "0,00"}</Text>
              <Text style={styles.saldoLabel}>EM ATRASO</Text>
          </View>
          <View style={styles.saldoItem}>
              <Text style={styles.saldoValorCredito}>R$ {resumo?.ValorCredito?.toFixed(2) || "0,00"}</Text>
              <Text style={styles.saldoLabel}>CRÉDITO</Text>
          </View>
      </View>
  
      <View style={styles.contratosContainer}>
          <Text style={styles.sectionTitle}>Contratos ativos</Text>
          {resumo?.Contratos && resumo.Contratos.length > 0 ? (
            resumo?.Contratos?.map((contrato) => (
              <View key={contrato.Id} style={styles.contratoItem}>
                  <Text style={styles.contratoDescricao}>{contrato.Descricao}</Text>
                  <Text style={styles.contratoValidade}>Válido até {new Date(contrato.DataValidade).toLocaleDateString()}</Text>
              </View>
          ))
         ) : (
          <Text style={styles.alertaTexto}>Nenhum contrato ativo encontrado.</Text>
          )}
      </View>
  
      <View style={styles.sobreContainer}>
          <Text style={styles.sectionTitle}>Motivos de bloqueio</Text>
          {resumo?.Alertas && resumo.Alertas.length > 0 ? (
              resumo.Alertas.map((alerta, index) => (
                  <View key={index} style={styles.alertaItem}>
                      <Text style={styles.alertaTexto}>{alerta.Motivo}</Text>
                  </View>
              ))
          ) : (
              <Text style={styles.alertaTexto}>Nenhum motivo de bloqueio encontrado.</Text>
          )}
      </View>
    </ScrollView>
    );
};