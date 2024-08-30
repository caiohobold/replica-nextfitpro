import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes/stack.routes';
import loginService from '../../api/services/login';
import usuarioService from '../../api/services/usuario';
import * as SecureStore from 'expo-secure-store';
import { token } from '../../api/services/auth';
import LoginButton from '../../components/LoginButton';
import useLogin from '../../hooks/useLogin';
import styles from './styles';


export default function Login() {
    const { loadingLogin, handleVerifyEmail, onClickLogin, codigoTenant, codigoUnidade, isEmailVerified, setCodigoTenant, setCodigoUnidade, setTenants, tenants } = useLogin();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    return (
        <View style={styles.container}>
        <Image
            source={require('../../../assets/NextFitProLogo.png')}
            style={styles.logo}
        />
        {!isEmailVerified ? (
          <>
            <TextInput
              style={styles.input}
              placeholder="seuemail@email.com"
              value={email}
              onChangeText={setEmail}
            />
            <LoginButton title='Próximo' onPress={() => handleVerifyEmail(email)} loading={loadingLogin}/>
          </>
        ) : tenants.length > 1 && !codigoTenant ? (
          <>
            <Text style={styles.text}>Escolha a unidade:</Text>
            {tenants.map(tenant => (
              <LoginButton 
                key={tenant.CodigoTenant}
                title={tenant.Fantasia}
                onPress={() => {
                  setCodigoTenant(tenant.CodigoTenant.toString());
                  setCodigoUnidade(tenant.CodigoUnidade.toString());
                }}
                loading={false}
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
            <LoginButton title='Entrar' onPress={() => onClickLogin(email, password, codigoTenant, codigoUnidade)} loading={loadingLogin}/>
          </>
        )}
        </View>
    );
}

