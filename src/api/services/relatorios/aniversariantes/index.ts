import { IParamsRel } from '../../../interfaces';
import { BaseService } from '../../base';

export class AniversariantesService extends BaseService {
    protected path: string = '/relcliente';

    recuperarAniversariantes(params: IParamsRel) {
        return this.get({
            endPoint: 'RecuperarAniversariantes',
            params: {
                DataFimStr: params.DataFimStr,
                DataIniStr: params.DataIniStr,
                MostrarInativos: params.MostrarInativos
            }
        });
    }
}



const aniversariantesService = new AniversariantesService();

export {aniversariantesService};
