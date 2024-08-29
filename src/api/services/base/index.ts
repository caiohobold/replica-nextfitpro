import api from '../../index';
import {IResponse} from '../../interfaces';
import {IRequestBase} from './interfaces';

export class BaseService {
    // @ts-ignore
    protected path: string;

    public async get(request: IRequestBase) {
        const {params, version, endPoint} = request;
        return api.get(`${version ? `${version}/` : ''}${this.path}/${endPoint}`, {params}) as Promise<IResponse>;
    }

    public async post(request: IRequestBase) {
        const {params, version, endPoint} = request;
        return api.post(`${version ? `${version}/` : ''}${this.path}/${endPoint}`, params) as Promise<IResponse>;
    }

    public async delete(request: IRequestBase) {
        const {params, version, endPoint} = request;
        return api.delete(`${version ? `${version}/` : ''}${this.path}/${endPoint}`, {params}) as Promise<IResponse>;
    }

    public async put(request: IRequestBase) {
        const {params, version, endPoint} = request;
        return api.put(`${version ? `${version}/` : ''}${this.path}/${endPoint}`, params) as Promise<IResponse>;
    }
}
