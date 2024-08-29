import * as _ from 'lodash';
import { keyEnums } from '../keys';
import { IEnumItens, IEnums } from '../../api/services/enum/interfaces';
import SyncStorage from 'sync-storage';

const getStorageEnum = () => JSON.parse(SyncStorage.get(keyEnums) || 'null');

let enums = getStorageEnum();

export const getEnum = (enumName: string): Array<IEnumItens> | undefined => {
    if (!enums || !enums.Enums) return undefined; // Retorno padrão em caso de condições não atendidas
    const result = _.find(enums.Enums, (v, k: any) => k === enumName);
    return result as Array<IEnumItens> | undefined;
};

export const getEnumByIdentificadores = (enumName: string, identificadores: string[]): Array<IEnumItens> => {
    const enumsInstance = getEnum(enumName);
    if(!enumsInstance){
        return [];
    }
    return enumsInstance.filter(v => identificadores.includes(v.Identificador));
};

export const getTextEnum = (name: string, value: number) => {
    const enumInstance = _.find(getEnum(name), v => v.Valor === value);
    return enumInstance ? enumInstance.Texto : '';
};

export const getIdentificadorEnum = (name: string, value: number) => {
    const enumInstance = _.find(getEnum(name), v => v.Valor === value);
    return enumInstance ? enumInstance.Identificador : '';
};

export const getValueEnum = (identificador: string, text: string) => {
    const enumInstance = _.find(getEnum(identificador), v => v.Texto === text || v.Identificador === text);
    return enumInstance ? enumInstance.Valor : undefined;
};

export const setStorageEnum = (newEnums: IEnums) => {
    SyncStorage.set(keyEnums, JSON.stringify(newEnums));
    enums = getStorageEnum();
};