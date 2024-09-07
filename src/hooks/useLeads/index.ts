import React, { useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes/stack.routes';
import leadService from '../../api/services/leads';


export const useLeadsLista = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [leads, setLeads] = useState<Cliente[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

    const fetchLeads = async (currentPage: number) => {
        if (!hasMore || isLoadingMore) return;
    
        setIsLoadingMore(true);

        const params = {
            verRemovidos: false,
            fields: ["Id", "Nome", "Idade", "Sexo"], 
            limit: 50,
            page: currentPage
        }
    
        try {
          const response = await leadService.recuperarPesquisaGeral(params);
          const data: Cliente[] = response.data.Content;
    
          if (data.length < 50) {
            setHasMore(false);
          }
    
          setLeads((prevLeads) => [...prevLeads, ...data]);
          console.log('Data:', data);
        } catch (error) {
          console.error('Erro ao buscar leads:', error);
        } finally {
          setLoading(false);
          setIsLoadingMore(false);
        }
      };

    useFocusEffect(
      React.useCallback(() => {
        setLoading(true);
        setLeads([]);
        setPage(1);
        setHasMore(true);
        fetchLeads(1);
      }, [])
    );

    const handleLoadMore = () => {
      if (hasMore && !loading && !isLoadingMore) {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchLeads(nextPage);
      }
    };

    const renderStatusColor = (status: number) => {
      switch (status) {
        case 1:
          return '#00FF00'; 
        case 2:
          return '#FF0000';
        case 3:
          return '#808080';
        case 4:
          return '#FFFF00';
        default:
          return '#000000';
      }
    };

    const renderSexo = (status: number) => {
      switch (status) {
        case 1:
          return 'Masculino'; 
        case 2:
          return 'Feminino';
        default:
          return null;
      }
    };

    return {
      leads,
      setLeads,
      loading,
      setLoading,
      hasMore,
      setHasMore,
      renderSexo,
      renderStatusColor,
      handleLoadMore,
      fetchLeads,
      navigation
    }
}
