import qs from 'qs';
import axios from 'axios';
import {IRefreshTokenResponse, IToken, ITokenResponse} from './interfaces';
import * as SecureStore from 'expo-secure-store';

const apiURL = 'https://api-sandbox.appnext.fit/api/'

export const refreshToken = async () => {
    const refreshToken = await SecureStore.getItemAsync('X-REFRESH-TOKEN');
    const authToken = await SecureStore.getItemAsync('X-AUTH-TOKEN');

    const data = qs.stringify({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
    });

    return axios({
        method: 'post',
        url: `${apiURL}Token`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${authToken}`,
        },
        data: data,
    }).then((response: any) => response as IRefreshTokenResponse);
};

export const token = async (params: IToken) => {
    params.grant_type = 'password';
    const data = qs.stringify(params);

    const response = await axios({
        method: 'post',
        url: `${apiURL}Token`,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: data,
    });

    // Salvar tokens usando SecureStore
    await SecureStore.setItemAsync('X-AUTH-TOKEN', response.data.access_token);
    await SecureStore.setItemAsync('X-REFRESH-TOKEN', response.data.refresh_token);

    return response.data as ITokenResponse;
};
