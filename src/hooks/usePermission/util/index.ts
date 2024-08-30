import {keyAtualizarPermissoes, keyPermissoes, keyRefreshPermissoes} from '../../keys';
import {IPermissaoIterator} from '../../../api/services/perfilAcesso/interfaces';
import SyncStorage from 'sync-storage';

let permissoesGlobal: IPermissaoIterator = JSON.parse(SyncStorage.get(keyPermissoes) || 'null') || {};

export const setPermissoes = (permissions: IPermissaoIterator) => {
    permissoesGlobal = permissions;
    SyncStorage.set(keyPermissoes, JSON.stringify(permissoesGlobal));
};

export const getPermissoes = () => permissoesGlobal;
