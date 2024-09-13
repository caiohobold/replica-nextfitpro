import React, { useState } from "react";
import { receitaService } from "../../api/services/relatorios/receita";
import { useFocusEffect } from "@react-navigation/native";

export const useRelReceita = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [receita, setReceita] = useState<Receita[]>([]);
    const [valorTotalReceita, setValorTotalReceita] = useState(0);
    const [dataInicial, setDataInicial] = useState<Date>(getFirstDayOfMonth());
    const [dataFinal, setDataFinal] = useState<Date>(getLastDayOfMonth());

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
    };

    return {
        renderMetodoPagamento,
        getFirstDayOfMonth,
        getLastDayOfMonth,
        onChangeDate,
        receita,
        setReceita,
        setDataFinal,
        setDataInicial,
        dataFinal,
        dataInicial,
        valorTotalReceita,
        setValorTotalReceita,
        formatDate,
        fetchReceita,
        loading
    }
}