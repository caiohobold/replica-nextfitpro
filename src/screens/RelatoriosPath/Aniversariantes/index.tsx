import { Text, View, FlatList, Switch } from 'react-native';
import LoadingComponent from '../../../components/LoadingComponent';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import styles from './styles';
import { useRelAniversariantes } from '../../../hooks/useRelAniversariantes';

export default function RelatorioAniversariantes() {

  const {
    onChangeDate,
    aniversariantes,
    setDataFinal,
    setDataInicial,
    dataFinal,
    dataInicial,
    loading,
    isBirthdayToday,
    formatDateToDisplay,
    toggleSwitch,
    mostrarInativos
  } = useRelAniversariantes();


  const renderItem = ({ item }: { item: Aniversariantes }) => {
    const isToday = isBirthdayToday(item.DataNascimento); 
    const formattedDate = formatDateToDisplay(item.DataNascimento);

    return (
      <View 
        style={styles.itemContainer}
      >
        <View style={styles.textContainer}>
          <Text style={[styles.name, isToday && { color: 'orange', fontSize: 14 }]}>{item.Nome || "Cliente não identificado"}</Text>
          {isToday ? (
            <Text style={[styles.nascLabel, isToday && { color: 'orange', fontSize: 10 }]}>
            Está de aniversário!
            </Text>
          ) : (
            <></>
          )}
        </View>
        <View style={styles.textContainer}> 
          <Text style={[styles.name, isToday && { color: 'orange', fontSize: 14 }]}>{item.Fone ? `(${item.DddFone}) ${item.Fone}` : "Telefone não informado"}</Text>
        </View>
        <View style={styles.textContainer}> 
          <Text style={[styles.dataNasc, isToday && { color: 'orange', fontSize: 18 }]}>
            {item.DataNascimento ? formattedDate : "Data de nascimento não informada"}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.datasContainer}>
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
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Mostrar inativos?</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#6200EA' }}
          thumbColor={mostrarInativos ? '#fff' : '#f4f3f4'}
          onValueChange={toggleSwitch}
          value={mostrarInativos}
        />
      </View>
      <FlatList
        data={aniversariantes}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={loading ? <LoadingComponent size="large" color="#EF6C00" /> : null}
        ListEmptyComponent={<Text>Nenhuma receita disponível.</Text>}
      />
    </View>
  );
}
