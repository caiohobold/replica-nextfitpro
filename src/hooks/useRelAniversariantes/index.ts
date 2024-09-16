import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { aniversariantesService } from "../../api/services/relatorios/aniversariantes";

export const useRelAniversariantes = () => {
    const [mostrarInativos, setMostrarInativos] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [aniversariantes, setAniversariantes] = useState<Aniversariantes[]>([]);
    const [dataInicial, setDataInicial] = useState<Date>(getFirstDayOfMonth());
    const [dataFinal, setDataFinal] = useState<Date>(getLastDayOfMonth());

    const formatDate = (date: Date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const toggleSwitch = () => setMostrarInativos(previousState => !previousState);

    function getFirstDayOfMonth() {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), 1);
    }

    function getLastDayOfMonth() {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth() + 1, 0);
    }

    const isBirthdayToday = (dataNascimento: string) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
    
        const birthDate = new Date(dataNascimento);
        birthDate.setHours(0, 0, 0, 0);
    
        return (
            birthDate.getDate() === today.getDate() &&
            birthDate.getMonth() === today.getMonth()
        );
    };

    const formatDateToDisplay = (dataNascimento: string) => {
        const birthDate = new Date(dataNascimento);
        const day = String(birthDate.getDate()).padStart(2, '0');
        const month = String(birthDate.getMonth() + 1).padStart(2, '0'); 
        return `${day}/${month}`;
    };

    const fetchAniversariantes = async () => {
        const firstDay = formatDate(dataInicial);
        const lastDay = formatDate(dataFinal);


        const params = {
            DataFimStr: lastDay,
            DataIniStr: firstDay,
            MostrarInativos: mostrarInativos
        }

        try {
        const response = await aniversariantesService.recuperarAniversariantes(params);
        const dadosAniversariantes: Aniversariantes[] = response.data.Content;

        setAniversariantes(dadosAniversariantes);
        console.log('Response:', response.data.Content);
        } catch (error) {
        console.error('Erro ao buscar aniversariantes:', error);
        } finally {
        setLoading(false);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchAniversariantes();
        }, [mostrarInativos, dataInicial, dataFinal]) 
    );

    const onChangeDate = (event: any, selectedDate: Date | undefined, setDate: (date: Date) => void) => {
        if (selectedDate) {
        setDate(selectedDate);
        }
    };

    return {
        getFirstDayOfMonth,
        getLastDayOfMonth,
        onChangeDate,
        aniversariantes,
        setAniversariantes,
        setDataFinal,
        setDataInicial,
        dataFinal,
        dataInicial,
        formatDate,
        fetchAniversariantes,
        loading,
        isBirthdayToday,
        formatDateToDisplay,
        toggleSwitch,
        mostrarInativos,
        setMostrarInativos
    }
}