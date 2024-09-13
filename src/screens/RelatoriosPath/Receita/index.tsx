import { StyleSheet, Text, View, FlatList, Button, TouchableOpacity } from 'react-native';
import LoadingComponent from '../../../components/LoadingComponent';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { receitaService } from '../../../api/services/relatorios/receita';
import { useFocusEffect } from '@react-navigation/native';

export default function RelatorioReceita() {

  const [loading, setLoading] = useState<boolean>(false);
  const [receita, setReceita] = useState<Receita[]>([]);
  const [valorTotalReceita, setValorTotalReceita] = useState(0);
  const [dataInicial, setDataInicial] = useState<Date>(getFirstDayOfMonth());
  const [dataFinal, setDataFinal] = useState<Date>(getLastDayOfMonth());
  const [showInicialPicker, setShowInicialPicker] = useState<boolean>(false);
  const [showFinalPicker, setShowFinalPicker] = useState<boolean>(false);

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const renderMetodoPagamento = (metodo: number) => {
    switch (metodo) {
      case 1:
        return "Cartão de crédito"
      case 2:
        return "Cartão de débito"
      case 3:
        return "Dinheiro"
      case 10:
        return "PIX/Depósito"
    }
  }

  function getFirstDayOfMonth() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  }

  function getLastDayOfMonth() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth() + 1, 0);
  }

  const fetchReceita = async () => {
    const firstDay = formatDate(dataInicial);
    const lastDay = formatDate(dataFinal);


    const params = {
        DataFinalStr: lastDay,
        DataInicialStr: firstDay,
        TipoOrigem: 0
    }

    try {
      const response = await receitaService.recuperarRelReceita(params);
      const valorTotal = response.data.Content.ValorTotal;
      const dadosReceita: Receita[] = response.data.Content.Dados;

      setReceita(dadosReceita);
      setValorTotalReceita(valorTotal);
      console.log('Valor Total:', valorTotal);
    } catch (error) {
      console.error('Erro ao buscar receita:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
        fetchReceita();
    }, [dataInicial, dataFinal]) 
  );

  const onChangeDate = (event: any, selectedDate: Date | undefined, setDate: (date: Date) => void) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
    setShowInicialPicker(false);
    setShowFinalPicker(false);
  };


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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10
  },
  datasContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 10,
  },
  dateButton: {
    backgroundColor: '#EF6C00',
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  dateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  datePicker: {
    marginLeft: -10,
  },
  datasLabel: {
    textAlign: 'right'
  },
  valorTotalContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  valorTotalValue: {
    fontSize: 17,
    fontWeight: 'bold'
  },
  valorTotalLabel: {
    fontSize: 16
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    height: 80,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 10,
    gap: 10
  },
  textContainer: {
    flex: 1
  },
  name: {
    fontSize: 14,
    color: 'black',
  },
  metodoPagamento: {
    fontSize: 12,
    color: '#000',
  },
});
