import { IParamsPesquisaGeral } from '../../../interfaces';
import { BaseService } from '../../base';

export class PagarService extends BaseService {
    protected path: string = '/pagar';

    recuperarPagarHoje(params: IParamsPesquisaGeral) {
        return this.get({
            endPoint: 'recuperarTotalizadores',
            params: {
                filter: JSON.stringify(params.filter),
            }
        });
    }
}


const pagarService = new PagarService();

export {pagarService};
