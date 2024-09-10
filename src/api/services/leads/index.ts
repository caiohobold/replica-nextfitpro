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

    inserirLead(leadData: any) {
        return this.post({
            endPoint: 'Inserir',
            params: leadData
        })
    }
}

export class LeadListService extends BaseService {
    protected path: string = '/Pessoa';

    listarLead(params: IParamsPesquisaGeral) {
        return this.get({
            endPoint: 'Listar',
            params: {
                filter: JSON.stringify(params.filter),
                includes: JSON.stringify(params.includes),
                limit: params.limit,
                page: params.page
            }
        })
    }
}

const leadListService = new LeadListService();
const leadService = new LeadsServices();

export {leadService, leadListService};
