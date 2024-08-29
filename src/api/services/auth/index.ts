import qs from 'qs';
import axios from 'axios';
import {IRefreshTokenResponse, IToken, ITokenResponse} from './interfaces';
import SyncStorage from 'sync-storage';

const apiURL = 'https://api.sandbox.appnext.fit/api/'

export const refreshToken = async () => {
    const data = qs.stringify({
        grant_type: 'refresh_token',
        refresh_token: SyncStorage.get('X-REFRESH-TOKEN'),
    });
    return axios({
        method: 'post',
        // eslint-disable-next-line no-underscore-dangle
        url: `${apiURL}Token`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${SyncStorage.get('X-AUTH-TOKEN')}`,
        },
        data: data,
    }).then((response: any) => response as IRefreshTokenResponse);
};

export const token = async (params: IToken) => {
    // eslint-disable-next-line no-param-reassign
    params.grant_type = 'password';
    const data = qs.stringify(params);
    return axios({
        method: 'post',
        // eslint-disable-next-line no-underscore-dangle
        url: `${apiURL}Token`,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: data,
    }).then((response: any) => response.data as ITokenResponse);
};
