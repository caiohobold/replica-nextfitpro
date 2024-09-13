import { IParamsRel } from '../../../interfaces';
import { BaseService } from '../../base';

export class ReceitaService extends BaseService {
    protected path: string = '/RelReceber';

    recuperarRelReceita(params: IParamsRel) {
        return this.get({
            endPoint: 'RecuperarRelReceita',
            params: {
                DataFinalStr: params.DataFinalStr,
                DataInicialStr: params.DataInicialStr,
                TipoOrigem: params.TipoOrigem
            }
        });
    }
}



const receitaService = new ReceitaService();

export {receitaService};
