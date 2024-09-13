import { Text, View, FlatList } from 'react-native';
import LoadingComponent from '../../../components/LoadingComponent';
import DateTimePicker from '@react-native-community/datetimepicker';
import React from 'react';
import styles from './styles';
import { useRelReceita } from '../../../hooks/useRelReceita';

export default function RelatorioReceita() {

  const {
    renderMetodoPagamento,
    onChangeDate,
    receita,
    setDataFinal,
    setDataInicial,
    dataFinal,
    dataInicial,
    valorTotalReceita,
    loading
  } = useRelReceita();


  const renderItem = ({ item }: { item: Receita }) => {
    return (
      <View 
        style={styles.itemContainer}
      >
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.NomeCliente || "Cliente não identificado"}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.metodoPagamento}>{item.MetodoPagamento ? renderMetodoPagamento(item.MetodoPagamento) : "Sem método de pagamento"}</Text>
        </View>
        <View style={styles.textContainer}> 
          <Text style={styles.name}>{item.Valor ? `R$${item.Valor.toFixed(2)}` : "Valor não informado"}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.datasContainer}>
        <View style={styles.valorTotalContainer}>
          <Text style={styles.valorTotalLabel}>Total:</Text>
          <Text style={styles.valorTotalValue}>R${valorTotalReceita.toFixed(2)}</Text>
        </View>
        <View>
          <Text style={styles.datasLabel}>Data inicial</Text>
          <DateTimePicker
            style={styles.datePicker}
            value={dataInicial}
            mode="date"
            display="compact"
            onChange={(event, date) => onChangeDate(event, date, setDataInicial)}
          />
        </View>
        <View>
          <Text style={styles.datasLabel}>Data final</Text>
          <DateTimePicker
            style={styles.datePicker}
            value={dataFinal}
            mode="date"
            display="default"
            onChange={(event, date) => onChangeDate(event, date, setDataFinal)}
          />
        </View>
      </View>
      <FlatList
        data={receita}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={loading ? <LoadingComponent size="large" color="#EF6C00" /> : null}
        ListEmptyComponent={<Text>Nenhuma receita disponível.</Text>}
      />
    </View>
  );
}