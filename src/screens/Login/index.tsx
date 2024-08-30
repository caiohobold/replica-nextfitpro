import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes/stack.routes';
import loginService from '../../api/services/login';
import usuarioService from '../../api/services/usuario';
import * as SecureStore from 'expo-secure-store';
import { token } from '../../api/services/auth';


export default function Login() {
    const [loadingLogin, setLoadingLogin] = useState<boolean>(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [codigoTenant, setCodigoTenant] = useState<string | undefined>(undefined);
    const [codigoUnidade, setCodigoUnidade] = useState<string | undefined>(undefined);
    const [tenants, setTenants] = useState<Array<any>>([]);
    const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const handleVerifyEmail = async () => {
      if (!email) {
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

  const onClickLogin = async () => {
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
        alert('Erro ao realizar login');
        setLoadingLogin(false);
    }
  };

    return (
        <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        {!isEmailVerified ? (
          <>
            <TextInput
              style={styles.input}
              placeholder="E-mail"
              value={email}
              onChangeText={setEmail}
            />
            <Button title="Proximo" onPress={handleVerifyEmail} />
          </>
        ) : tenants.length > 1 && !codigoTenant ? (
          <>
            {tenants.map(tenant => (
              <Button
                title={tenant.Fantasia}
                key={tenant.CodigoTenant}
                onPress={() => {
                  setCodigoTenant(tenant.CodigoTenant.toString());
                  console.log(codigoTenant);
                  setCodigoUnidade(tenant.CodigoUnidade.toString());
                }}
              />
            ))}
          </>
        ) : (
          <>
            <TextInput
              style={styles.input}
              placeholder="Senha"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <Button title="Entrar" onPress={onClickLogin} />
          </>
        )}
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
});
