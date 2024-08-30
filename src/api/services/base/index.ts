import api from '../../index';
import { IResponse } from '../../interfaces';
import { IRequestBase } from './interfaces';
import * as SecureStore from 'expo-secure-store';

export class BaseService {
    protected path?: string;

    public async get(request: IRequestBase) {
        const { params, version, endPoint } = request;
        const authToken = await SecureStore.getItemAsync('authToken');

        return api.get(`${version ? `${version}/` : ''}${this.path}/${endPoint}`, {
            params,
            headers: {
                'Authorization': `Bearer ${authToken}`,
            }
        }) as Promise<IResponse>;
    }

    public async post(request: IRequestBase) {
        const { params, version, endPoint } = request;
        const authToken = await SecureStore.getItemAsync('authToken');

        return api.post(`${version ? `${version}/` : ''}${this.path}/${endPoint}`, params, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
            }
        }) as Promise<IResponse>;
    }

    public async delete(request: IRequestBase) {
        const { params, version, endPoint } = request;
        const authToken = await SecureStore.getItemAsync('authToken');

        return api.delete(`${version ? `${version}/` : ''}${this.path}/${endPoint}`, {
            params,
            headers: {
                'Authorization': `Bearer ${authToken}`,
            }
        }) as Promise<IResponse>;
    }

    public async put(request: IRequestBase) {
        const { params, version, endPoint } = request;
        const authToken = await SecureStore.getItemAsync('authToken');

        return api.put(`${version ? `${version}/` : ''}${this.path}/${endPoint}`, params, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
            }
        }) as Promise<IResponse>;
    }
}
