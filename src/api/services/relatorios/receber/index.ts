import { IParamsPesquisaGeral } from '../../../interfaces';
import { BaseService } from '../../base';

export class ReceberService extends BaseService {
    protected path: string = '/receber';

    recuperarReceberHoje(params: IParamsPesquisaGeral) {
        return this.get({
            endPoint: 'recuperarTotalizadores',
            params: {
                filter: JSON.stringify(params.filter),
            }
        });
    }
}


const receberService = new ReceberService();

export {receberService};
