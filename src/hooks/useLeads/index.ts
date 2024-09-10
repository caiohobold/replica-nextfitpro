import React, { useEffect, useRef, useState } from 'react';
import { Alert, Animated } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {leadService, leadListService} from '../../api/services/leads'
import { useRoute, RouteProp } from '@react-navigation/native';
type PerfilClienteRouteProp = RouteProp<RootStackParamList, 'LeadPerfil'>;
import { RootStackParamList } from '../../routes/stack.routes';
import { oportunidadesService } from '../../api/services/oportunidades';
import { atividadesService } from '../../api/services/atividades';


export const useLeadsLista = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [leads, setLeads] = useState<Lead[]>([]);
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
          const data: Lead[] = response.data.Content;
    
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

export const useLeadPerfil = () => {
    const route = useRoute<PerfilClienteRouteProp>();
    const { leadId } = route.params;
    const [loading, setLoading] = useState<boolean>(true);
    const [lead, setLead] = useState<Lead | null>(null);
    const [oportunidade, setOportunidade] = useState<Oportunidade | null>(null);
    const [atividades, setAtividades] = useState<Atividade | null>(null);
    const [index, setIndex] = useState(0);
    const [routes] = useState([
      { key: 'resumo', title: 'Resumo', icon: 'home' },
      { key: 'informacoes', title: 'Informações', icon: 'user' },
      { key: 'endereco', title: 'Endereço', icon: 'map-pin' },
    ]);

    const [expanded, setExpanded] = useState<number | null>(null);
    const animation = useRef(new Animated.Value(0)).current;
    const [deveReload, setDeveReload] = useState<boolean>(false);
    const [loadingRemover, setLoadingRemover] = useState<{ [key: number]: boolean }>({});
    const [loadingConcluir, setLoadingConcluir] = useState<{ [key: number]: boolean }>({});

    const toggleMenu = (id: number) => {
        if (expanded === id) {
          Animated.timing(animation, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
          }).start(() => setExpanded(null));
        } else {
          setExpanded(id);
          Animated.timing(animation, {
            toValue: 50,
            duration: 300,
            useNativeDriver: false,
          }).start();
        }
      };

    const handleConcluiAtividade = async (atividadeId: number) => {
        setLoadingConcluir((prev) => ({ ...prev, [atividadeId]: true }));

        try {
            const payload = { Codigo: atividadeId };
            await atividadesService.concluirAtividade(payload);
            setDeveReload(true); 
        } finally {
            setLoadingConcluir((prev) => ({ ...prev, [atividadeId]: false }));
        }
    }

    const handleRemoveAtividade = async (atividadeId: number) => {
        setLoadingRemover((prev) => ({ ...prev, [atividadeId]: true }));

        try {
            const payload = { Codigo: atividadeId };
            await atividadesService.inativaAtividade(payload);
            setDeveReload(true);
        } finally {
            setLoadingRemover((prev) => ({ ...prev, [atividadeId]: false }));
        }
    }

    useEffect(() => {
        if (deveReload) {
            fetchAtividades();
            setDeveReload(false); 
        }
    }, [deveReload]);
  
    const fetchLead = async () => {
        const params = {
            verRemovidos: false,
            filter: [{"property":"Id", "operator":"equal", "value":`${leadId}`}],
            limit: 1,
            page: 1
        }
        try {
            const responseLead = await leadListService.listarLead(params);
            console.log("Lead: ", responseLead.data.Content[0]);
            setLead(responseLead.data.Content[0]);
        } catch (error) {
            console.error('Erro ao buscar clientes:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchOportunidades = async () => {
        const params = {
            limit: 5,
            page: 1,
            fields: ["Id", "CodigoPessoa", "Status", "DataCriacao", "DataFechamento", "Valor", "Descricao"],
            filter: [{"property":"CodigoPessoa","value":`${leadId}`,"operator":"equal"},{"property":"Status","value":[1],"operator":"in"}]
        }
        try {
            const responseOportunidade = await oportunidadesService.listarOportunidade(params);
            console.log("Oportunidade do lead: ", responseOportunidade.data);
            setOportunidade(responseOportunidade.data);
        } catch (error) {
            console.error('Erro ao buscar oportunidades:', error);
        } finally {
            setLoading(false);
        }
    }

    const fetchAtividades = async () => {
        const params = {
            limit: 3,
            page: 1,
            includes: ["TipoAtividade"],
            fields: ["Id","Assunto","Descricao","Status","TipoAtividade.Descricao","Inativo","DataHoraRealizada","DataHoraPrevista"],
            filter: [{"property":"Inativo","value":false,"operator":"equal"},{"property":"SemDataPrevista","value":false,"operator":"equal"},{"property":"Status","value":[1],"operator":"in"},{"property":"CodigoPessoa","value":`${leadId}`,"operator":"equal","and":true}]
        }
        try {
            const responseAtividade = await atividadesService.listarAtividades(params);
            console.log("Atividade do lead: ", responseAtividade.data);
            setAtividades(responseAtividade.data);
        } catch (error) {
            console.error('Erro ao buscar atividades:', error);
        } finally {
            setLoading(false);
        }
    }
  
    useFocusEffect(
      React.useCallback(() => {
        setLoading(true); 
        fetchLead();
        fetchOportunidades();
        fetchAtividades();
      }, [])
    );

  
    return {
      lead,
      setLead,
      oportunidade,
      setOportunidade,
      atividades,
      setAtividades,
      loading,
      setLoading,
      routes,
      index,
      setIndex,
      fetchLead,
      fetchOportunidades,
      fetchAtividades,
      toggleMenu,
      expanded,
      animation,
      handleConcluiAtividade,
      handleRemoveAtividade,
      loadingConcluir,
      loadingRemover
    }
  }

export const useLeadAdd = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'informacoes', title: 'Informações', icon: 'user' },
    { key: 'endereco', title: 'Endereço', icon: 'map-pin' },
    { key: 'responsaveis', title: 'Responsáveis', icon: 'user-check' },
    { key: 'mais', title: 'Mais', icon: 'more-horizontal' },
  ]);

  const [form, setForm] = useState({
    Nome: '',
    DataNascimento: '',
    Sexo: 1,
    CodigoObjetivo: '',
    Fone: '',
    Email: '',
    Cpf: '',
    DddFone: '48',
    bairro: '',
    complemento: '',
    numEndereco: '',
    endereco: '',
    cep: '',
    CodigoCidade: null,
    notificarWhatsApp: true,
    codigoUsuarioProfessor: 15073778,
    codigoClienteResponsavel: 9967247,
    CodigoUsuarioConsultor: 15073778,
    Rg: ''
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
      const response = await leadService.inserirLead(payload);
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
