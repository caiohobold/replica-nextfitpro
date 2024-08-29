import axios, {AxiosResponseTransformer} from 'axios';
import {refreshToken} from './services/auth';
import {EnumHttpCodes} from '../enums/EnumHttpCodes';
import SyncStorage from 'sync-storage';

import {IErrorResponse} from './interfaces';
import {keyCompany, keyRefreshToken, keyToken, keyUser} from './keys';

export const setToken = (token: string) => {
    SyncStorage.set(keyToken, token);
};

export const setRefreshToken = (refresh_token: string) => {
    SyncStorage.set(keyRefreshToken, refresh_token);
};

const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/;

const convertDates = (key: any, value: any) => {
    if (typeof value === 'string' && dateFormat.test(value)) {
        return new Date(value);
    }
    return value;
};

const transformDeserializer: AxiosResponseTransformer = (data: any) => {
    if (typeof data === 'string') {
        try {
            return JSON.parse(data, convertDates);
        } catch (e) {
            return data;
        }
    }
    return data;
};

const apiURL = 'https://api.sandbox.appnext.fit/api/'

// @ts-ignore
const api = axios.create({
    // eslint-disable-next-line no-underscore-dangle
    baseURL: apiURL,
    timeout: 50000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
    // @ts-ignore
    transformResponse: [transformDeserializer].concat(axios.defaults.transformResponse),
});

export const getToken = () => SyncStorage.get(keyToken);

const getRefreshToken = () => SyncStorage.get(keyRefreshToken);

const clearStorage = () => {
    SyncStorage.remove(keyToken);
    SyncStorage.remove(keyRefreshToken);
    SyncStorage.remove(keyUser);
    SyncStorage.remove(keyCompany);
};

function requestInterceptor(reqConfig: any) {
    const newRecConfig = reqConfig;
    newRecConfig.headers.Authorization = `Bearer ${getToken()}`;
    return newRecConfig;
}

function requestErrorInterceptor(err: any) {
    return Promise.reject(err);
}

function responseInterceptor(response: any) {
    return {
        ...response,
        status: response.status,
        Total: response.data.Total,
        First: response.data.First,
        Last: response.data.Last,
        Content: response.data.Content as Array<any>,
    };
}

const logoff = () => {
    clearStorage();
    window.location.href = '/login';
};

async function responseErrorInterceptor(err: IErrorResponse) {
    const customError = err;

    if (!customError.response) {
        return Promise.reject(customError);
    }

    if (customError.response.status === EnumHttpCodes.UNAUTHORIZED) {
        const refreshTokenStorage = getRefreshToken();
        if (!refreshTokenStorage) {
            logoff();
            return Promise.reject(new Error('Não autenticado'));
        }
        try {
            const retorno = await refreshToken();
            if (retorno.data.access_token) {
                setToken(retorno.data.access_token);
                setRefreshToken(retorno.data.refresh_token);
                api.defaults.headers.common.Authorization = `Bearer ${retorno.data.access_token}`;
            }
            return await api.request(customError.config);
        } catch (error) {
            logoff();
            return Promise.reject(new Error('Não foi possível atualizar o token de autenticação'));
        }
    }

    switch (customError.response.status) {
        case EnumHttpCodes.NOT_FOUND:
            customError.message = 'Endereço não foi encontrado';
            break;
        case EnumHttpCodes.NOT_IMPLEMENTED:
            customError.message = 'Acesso negado';
            break;
        default: {
            if (customError.response.data && customError.response.data.Message) {
                if (customError.response.data.ErrorCode > 1) {
                    customError.message = customError.response.data.Message;
                    break;
                }
                customError.message = 'Algo inesperado aconteceu, tente novamente ou entre em contato com o suporte';
            } else {
                if (err.response.status !== -1) {
                    customError.message = `Erro desconhecido: ${customError.response.status} - ${customError.response.statusText}`;
                    break;
                }
                customError.message = `Erro desconhecido`;
            }
        }
    }

    if (customError.message) {
        // showErrorNotification(customError.message);
    }

    return Promise.reject(customError);
}

api.interceptors.request.use(requestInterceptor, requestErrorInterceptor);
api.interceptors.response.use(responseInterceptor, responseErrorInterceptor);

export default api;