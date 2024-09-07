import { IParamsPesquisaGeral } from '../../interfaces';
import { BaseService } from '../base';

export class LeadsServices extends BaseService {
    protected path: string = '/lead';

    recuperarPesquisaGeral(params: IParamsPesquisaGeral) {
        return this.get({
            endPoint: 'recuperarPesquisaGeral',
            params: {
                VerRemovidos: params.verRemovidos,
                fields: JSON.stringify(params.fields),
                includes: params.includes,
                limit: params.limit,
                page: params.page
            }
        });
    }
}

const leadService = new LeadsServices();

export default leadService;
