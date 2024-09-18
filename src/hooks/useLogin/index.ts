import { useState } from 'react';
import loginService from '../../api/services/login';
import usuarioService from '../../api/services/usuario';
import * as SecureStore from 'expo-secure-store';
import { token } from '../../api/services/auth';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes/stack.routes';
import { desempenhoService } from '../../api/services/desempenho';
import { receberService } from '../../api/services/relatorios/receber';
import { pagarService } from '../../api/services/relatorios/pagar';

const useLogin = () => {
    const [loadingLogin, setLoadingLogin] = useState(false);
    const [tenants, setTenants] = useState<Array<any>>([]);
    const [codigoUnidade, setCodigoUnidade] = useState<string | undefined>(undefined);
    const [codigoTenant, setCodigoTenant] = useState<string | undefined>(undefined);
    const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false);
    const [userInfo, setUserInfo] = useState<any>(null);
    const [quantClientesAtivos, setQuantClientesAtivos] = useState<number | null>(null);
    const [receberHoje, setReceberHoje] = useState<number | null>(null);
    const [pagarHoje, setPagarHoje] = useState<number | null>(null);
    const [quantClientesNovos, setQuantClientesNovos] = useState<number | null>(null);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();


    const handleVerifyEmail = async (email: string) => {
        if(!email) {
            alert('Por favor, insira um e-mail');
            return;
        }
        try {
            setLoadingLogin(true);
            const response = await loginService.verificarUnidadePorEmail(email);
            console.log('Response:', response.data.Content);
            const { Tenants, CodigoUnidade } = response.data.Content || {};
            console.log(Tenants);
            console.log(CodigoUnidade);
  
            if (Tenants && Tenants.length > 1) {
                //Caso tenha mais de 1 tenant
                setTenants(Tenants);
                setCodigoUnidade(undefined);
                console.log("CODIGO UNIDADE -> Tenants && Tenants.length > 1: ", codigoUnidade);
                console.log("TENANTS -> Tenants && Tenants.length > 1: ", tenants);
                setIsEmailVerified(true); 
            } else if (!Tenants) {
                setCodigoUnidade(CodigoUnidade);
                setCodigoTenant(undefined);
                setIsEmailVerified(true); // Vai direto para a senha
            }
  
            setLoadingLogin(false);
        } catch (error) {
            alert('Erro ao verificar unidades');
            setLoadingLogin(false);
        }
    };

    const onClickLogin = async (email: string, password: string, codigoTenant?: string, codigoUnidade?: string) => {
        if (!email || !password) {
            alert('Preencha todos os campos');
            return;
        }
        try {
            setLoadingLogin(true);
            const retorno = await token({
              username: email,
              password: password,
              codigoTenant: Number(codigoTenant),
              codigoUnidade: Number(codigoUnidade)
            })
            await SecureStore.setItemAsync('authToken', retorno.access_token);
            await SecureStore.setItemAsync('refreshToken', retorno.refresh_token);
            await updateUserInfo();
            setLoadingLogin(false);
            navigation.navigate('inicio');
        } catch (error: any) {
            alert('Usuário ou senha inválidos!');
            setLoadingLogin(false);
        }
    };

    const fetchQuantClientesAtivos = async () => {
        try {
            const responseAtivos = await desempenhoService.recuperarQuantClientesAtivos();
            setQuantClientesAtivos(responseAtivos.data.Content?.QuantClientesAtivos ?? 0);

            const novosClientes = await desempenhoService.recuperarQuantNovosClientes();
            setQuantClientesNovos(novosClientes.data.Content?.QuantNovosClientes ?? 0);
        } catch (error) {
            alert('Erro ao recuperar quantidade de clientes ativos');
        }
    };

    const updateUserInfo = async () => {
        try {
            const usuario = await usuarioService.recuperarUsuarioLogado();
            console.log(usuario);
            setUserInfo(usuario.data.Content);
        } catch (error) {
            alert('Erro ao recuperar informações do usuário');
        }
    };

    const getCurrentDateISO = () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return today.toISOString();
    };

    const paramsReceberHoje = {
        filter: [
            {"property":"Status","operator":"in","value":[1,2,5],"and":true},
            {"property":"DataVencimento","operator":"greaterOrEqual","value":getCurrentDateISO(),"and":true},
            {"property":"DataVencimento","operator":"lessOrEqual","value":getCurrentDateISO(),"and":true}
        ]
    }

    const paramsPagarHoje = {
        filter: [
            {"property":"Status","operator":"in","value":[1,2],"and":true},
            {"property":"DataVencimento","operator":"greaterOrEqual","value":getCurrentDateISO(),"and":true},
            {"property":"DataVencimento","operator":"lessOrEqual","value":getCurrentDateISO(),"and":true}
        ]
    }

    const fetchReceberHoje = async () => {
        try {
            const responseReceber = await receberService.recuperarReceberHoje(paramsReceberHoje);
            console.log(responseReceber.data.Content.Abertos);
            setReceberHoje(responseReceber.data.Content?.Abertos ?? 0)
        } catch (error) {
            alert('Erro ao recuperar valor para receber hoje.');
        }
    }

    const fetchPagarHoje = async () => {
        try {
            const responsePagar = await pagarService.recuperarPagarHoje(paramsPagarHoje);
            console.log(responsePagar.data.Content.Abertos);
            setPagarHoje(responsePagar.data.Content?.Abertos ?? 0)
        } catch (error) {
            alert('Erro ao recuperar valor para pagar hoje.');
        }
    }


    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Bom dia';
        if (hour < 18) return 'Boa tarde';
        return 'Boa noite';
    };

    return { 
        loadingLogin, 
        handleVerifyEmail, 
        onClickLogin, 
        codigoTenant, 
        codigoUnidade, 
        isEmailVerified, 
        setCodigoTenant, 
        setCodigoUnidade, 
        setTenants, 
        tenants, 
        userInfo, 
        getGreeting, 
        updateUserInfo, 
        fetchQuantClientesAtivos,
        fetchReceberHoje,
        fetchPagarHoje,
        pagarHoje,
        receberHoje,
        quantClientesAtivos,
        quantClientesNovos
    };
};

export default useLogin;
