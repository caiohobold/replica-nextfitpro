import { useState } from 'react';
import loginService from '../../api/services/login';
import usuarioService from '../../api/services/usuario';
import * as SecureStore from 'expo-secure-store';
import { token } from '../../api/services/auth';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes/stack.routes';

const useLogin = () => {
    const [loadingLogin, setLoadingLogin] = useState(false);
    const [tenants, setTenants] = useState<Array<any>>([]);
    const [codigoUnidade, setCodigoUnidade] = useState<string | undefined>(undefined);
    const [codigoTenant, setCodigoTenant] = useState<string | undefined>(undefined);
    const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false);
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
            await usuarioService.recuperarUsuarioLogado();
            navigation.navigate('inicio');
        } catch (error: any) {
            alert('Usuário ou senha inválidos!');
            setLoadingLogin(false);
        }
    };

    return { loadingLogin, handleVerifyEmail, onClickLogin, codigoTenant, codigoUnidade, isEmailVerified, setCodigoTenant, setCodigoUnidade, setTenants, tenants };
};

export default useLogin;
