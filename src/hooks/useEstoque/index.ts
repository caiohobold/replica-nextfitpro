import React, { useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useRoute, RouteProp } from '@react-navigation/native';
type PerfilClienteRouteProp = RouteProp<RootStackParamList, 'LeadPerfil'>;
import { RootStackParamList } from '../../routes/stack.routes'
import { estoqueService } from '../../api/services/estoque';


export const useEstoqueLista = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [estoque, setEstoque] = useState<Estoque[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

    const fetchEstoque = async (currentPage: number) => {
        if (!hasMore || isLoadingMore) return;
    
        setIsLoadingMore(true);

        const params = {
            fields: ["Descricao", "Tipo", "Preco", "Observacao", "QtdeMinima", "Id", "ItemParametro.QtdeEmEstoque", "ControlaEstoque"],
            filter: [{"property":"Tipo","operator":"in","value":[1],"and":true},{"property":"Inativo","operator":"equal","value":false,"and":true}],
            includes: ["ItemParametro","CategoriaReceita"],
            limit: 10,
            page: currentPage
        }
    
        try {
          const response = await estoqueService.listarEstoque(params);
          const data: Estoque[] = response.data.Content;
    
          if (data.length < 50) {
            setHasMore(false);
          }
    
          setEstoque((prevEstoque) => [...prevEstoque, ...data]);
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
        setEstoque([]);
        setPage(1);
        setHasMore(true);
        fetchEstoque(1);
      }, [])
    );

    const handleLoadMore = () => {
      if (hasMore && !loading && !isLoadingMore) {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchEstoque(nextPage);
      }
    };

    return {
      estoque,
      setEstoque,
      loading,
      setLoading,
      hasMore,
      setHasMore,
      handleLoadMore,
      fetchEstoque,
      navigation
    }
}