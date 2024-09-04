import React, { useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import clienteService from '../../api/services/clientes';
type PerfilClienteRouteProp = RouteProp<RootStackParamList, 'ClientePerfil'>;
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../routes/stack.routes';
import { Alert } from 'react-native';

export const useClientesLista = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

    const fetchClientes = async (currentPage: number) => {
        if (!hasMore || isLoadingMore) return;
    
        setIsLoadingMore(true);
    
        try {
          const response = await clienteService.recuperarPesquisaGeral(currentPage);
          const data: Cliente[] = response.data.Content;
    
          if (data.length < 50) {
            setHasMore(false);
          }
    
          setClientes((prevClientes) => [...prevClientes, ...data]);
          console.log('Data:', data);
        } catch (error) {
          console.error('Erro ao buscar clientes:', error);
        } finally {
          setLoading(false);
          setIsLoadingMore(false);
        }
      };

    useFocusEffect(
      React.useCallback(() => {
        setLoading(true);
        setClientes([]);
        setPage(1);
        setHasMore(true);
        fetchClientes(1);
      }, [])
    );

    const handleLoadMore = () => {
      if (hasMore && !loading && !isLoadingMore) {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchClientes(nextPage);
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
      clientes,
      setClientes,
      loading,
      setLoading,
      hasMore,
      setHasMore,
      renderSexo,
      renderStatusColor,
      handleLoadMore,
      fetchClientes,
      navigation
    }
}

export const useClientePerfil = () => {
  const route = useRoute<PerfilClienteRouteProp>();
  const { clienteId } = route.params;
  const [loading, setLoading] = useState<boolean>(true);
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [resumo, setResumo] = useState<ResumoCliente | null>(null);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'resumo', title: 'Resumo', icon: 'home' },
    { key: 'informacoes', title: 'Informações', icon: 'user' },
    { key: 'endereco', title: 'Endereço', icon: 'map-pin' },
    { key: 'responsavel', title: 'Responsável', icon: 'user-check' },
  ]);

  const fetchCliente = async () => {
    try {
      const responseCliente = await clienteService.listarCliente(clienteId);
      const responseResumo = await clienteService.recuperarResumo(clienteId);
      console.log("Cliente: ", responseCliente.data.Content[0]);
      console.log("Resumo: ", responseResumo.data.Content);
      setCliente(responseCliente.data.Content[0]);
      setResumo(responseResumo.data.Content);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true); 
      fetchCliente();
    }, [])
  );

  const getStatusText = (status: number | undefined): string => {
    switch (status) {
      case 1:
        return "Ativo";
      case 2:
        return "Bloqueado";
      case 3:
        return "Inativo";
      case 4:
        return "Suspenso";
      default:
        return "Status desconhecido";
    }
  };

  const getStatusColor = (status: number | undefined): string => {
    switch (status) {
      case 1:
        return "green";
      case 2:
        return "red";
      case 3:
        return "gray"; 
      case 4:
        return "orange";
      default:
        return "black"; 
    }
  };

  return {
    cliente,
    setCliente,
    resumo,
    setResumo,
    getStatusColor,
    getStatusText,
    loading,
    setLoading,
    routes,
    index,
    setIndex,
    fetchCliente
  }
}

export const useClienteAdd = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'informacoes', title: 'Informações', icon: 'user' },
    { key: 'endereco', title: 'Endereço', icon: 'map-pin' },
    { key: 'responsaveis', title: 'Responsáveis', icon: 'user-check' },
    { key: 'mais', title: 'Mais', icon: 'more-horizontal' },
  ]);

  const [form, setForm] = useState({
    nome: '',
    dataNascimento: '',
    sexo: 1,
    objetivo: 57224,
    celular: '',
    email: '',
    cpf: '',
    dddFone: '48',
    bairro: '',
    complemento: '',
    numEndereco: '',
    endereco: '',
    cep: '',
    codigoCidade: 4557,
    notificarWhatsApp: true,
    codigoUsuarioProfessor: 15073778,
    temResponsavel: true,
    codigoClienteResponsavel: 9967247,
    codigoUsuarioConsultor: 15073778,
    rg: '7461149'
  });

  const handleInputChange = (name: string, value: string | number | boolean) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    const payload = {
      ...form,
    };

    try {
      const response = await clienteService.inserirCliente(payload);
      Alert.alert("Sucesso", "Cliente inserido com sucesso!");
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao inserir o cliente.");
      console.error(error);
    }
  };

  return {
    form,
    handleInputChange,
    handleSubmit,
    index,
    setIndex,
    routes
  }
}