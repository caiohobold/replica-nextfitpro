import axios, {AxiosResponseTransformer} from 'axios';
import {refreshToken} from './services/auth';
import {EnumHttpCodes} from '../enums/EnumHttpCodes';

import {IErrorResponse} from './interfaces';
import {keyCompany, keyRefreshToken, keyToken, keyUser} from './keys';

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
    window.location.href = '/login';
};

export default api;