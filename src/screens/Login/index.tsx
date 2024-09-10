import React, { useState } from 'react';
import { View, Text, TextInput, Image } from 'react-native';
import LoginButton from '../../components/LoginButton';
import useLogin from '../../hooks/useLogin';
import styles from './styles';


export default function Login() {
    const { loadingLogin, handleVerifyEmail, onClickLogin, codigoTenant, codigoUnidade, isEmailVerified, setCodigoTenant, setCodigoUnidade, tenants } = useLogin();
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

