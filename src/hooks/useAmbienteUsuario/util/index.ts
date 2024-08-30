import {IAmbienteUsuario} from '../../../api/services/usuario/interfaces';
import {keyAmbienteUsuario} from '../../keys';
import SyncStorage from 'sync-storage';

let ambienteUsuario: IAmbienteUsuario = JSON.parse(SyncStorage.get(keyAmbienteUsuario) || 'null') || undefined;

export const setAmbienteUsuario = (ambiente: IAmbienteUsuario) => {
    ambienteUsuario = ambiente;
    SyncStorage.set(keyAmbienteUsuario, JSON.stringify(ambienteUsuario));
};

export const getAmbienteUsuario = () => ambienteUsuario;
