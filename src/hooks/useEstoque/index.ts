import React, { useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useRoute, RouteProp } from '@react-navigation/native';
type PerfilClienteRouteProp = RouteProp<RootStackParamList, 'LeadPerfil'>;
import { RootStackParamList } from '../../routes/stack.routes'
import { estoqueEditService, estoqueService } from '../../api/services/estoque';
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import { Alert } from 'react-native';
import codegenNativeCommands from 'react-native/Libraries/Utilities/codegenNativeCommands';


export const useEstoqueLista = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [estoque, setEstoque] = useState<Estoque[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

    const [modalVisibleEntrada, setModalVisibleEntrada] = useState(false);
    const [modalVisibleSaida, setModalVisibleSaida] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
    const [quantidade, setQuantidade] = useState('');
    const [motivoEntrada, setMotivoEntrada] = useState('Entrada manual');
    const [motivoSaida, setMotivoSaida] = useState('Saída manual');

    const fetchEstoque = async (currentPage: number) => {
        if (!hasMore && currentPage !== 1 || isLoadingMore) {
          console.log('fetchEstoque não chamado: hasMore:', hasMore, 'isLoadingMore:', isLoadingMore);
          return;
        }
        

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
    
          if (data.length < params.limit) {
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

    const openModalEntrada = (productId: number) => {
      setSelectedProductId(productId);
      setModalVisibleEntrada(true);
    };

    const openModalSaida = (productId: number) => {
      setSelectedProductId(productId);
      setModalVisibleSaida(true);
    };

    const closeModalEntrada = () => {
      setModalVisibleEntrada(false);
      setSelectedProductId(null);
      setMotivoEntrada("Entrada manual");
      setQuantidade('');
    };

    const closeModalSaida = () => {
      setModalVisibleSaida(false);
      setSelectedProductId(null);
      setMotivoSaida("Saída manual");
      setQuantidade('');
    };

    const handleInputChange = (value: string | number | boolean) => {
      setQuantidade(value.toString());
      setMotivoEntrada(value.toString());
    };


    const handleSubmitAddEstoque = async () => {
      const payload = {
        CodigoItem: selectedProductId,
        CodigoUsuario: '',
        Qtde: quantidade,
        Data: new Date().toISOString(),
        Motivo: motivoEntrada,
        Tipo: 1
      };

  
      try {
        await estoqueEditService.editarEstoque(payload);
        Alert.alert("Sucesso", "Itens inseridos com sucesso!");
        closeModalEntrada();
        setQuantidade('');
        setMotivoEntrada('Entrada manual');
        setEstoque([]);
        setHasMore(true);
        setPage(1);
        fetchEstoque(1);
        setLoading(true);

      } catch (error) {
        Alert.alert("Erro", "Ocorreu um erro ao adicionar itens ao estoque.");
        console.error(error);
        closeModalEntrada();
        setQuantidade('');
        setMotivoEntrada('Entrada manual');
      }
    };
    
    const handleSubmitRemoveEstoque = async () => {
      const payload = {
        CodigoItem: selectedProductId,
        CodigoUsuario: '',
        Qtde: quantidade,
        Data: new Date().toISOString(),
        Motivo: motivoSaida,
        Tipo: 2
      }

      try {
        await estoqueEditService.editarEstoque(payload);
        Alert.alert("Sucesso", "Itens removidos com sucesso!");
        closeModalSaida();
        setQuantidade('');
        setMotivoSaida('Saída manual');
        setEstoque([]);
        setHasMore(true);
        setPage(1);
        fetchEstoque(1);
        setLoading(true);
      } catch (error) {
        Alert.alert("Erro", "Ocorreu um erro ao remover itens ao estoque.");
        console.error(error);
        closeModalSaida();
        setQuantidade('');
        setMotivoSaida('Entrada manual');
      }
    }


    return {
      estoque,
      setEstoque,
      loading,
      setLoading,
      hasMore,
      setHasMore,
      handleLoadMore,
      fetchEstoque,
      handleInputChange,
      handleSubmitAddEstoque,
      openModalEntrada,
      closeModalEntrada,
      quantidade,
      setQuantidade,
      motivoSaida,
      setMotivoSaida,
      motivoEntrada,
      setMotivoEntrada,
      handleSubmitRemoveEstoque,
      openModalSaida,
      closeModalSaida,
      navigation,
      modalVisibleEntrada,
      modalVisibleSaida
    }
}