import { IParamsPesquisaGeral } from '../../interfaces';
import { BaseService } from '../base';

export class AtividadesServices extends BaseService {
    protected path: string = '/Atividade';

    listarAtividades(params: IParamsPesquisaGeral) {
        return this.get({
            endPoint: 'Listar',
            params: {
                filter: JSON.stringify(params.filter),
                fields: JSON.stringify(params.fields),
                limit: params.limit,
                page: params.page,
                includes: JSON.stringify(params.includes)
            }
        })
    }

    concluirAtividade(payload: {}) {
        return this.post({
            endPoint: 'Concluir',
            params: payload
        })
    }

    inativaAtividade(payload: {}) {
        return this.post({
            endPoint: 'Inativar',
            params: payload
        })
    }
}

const atividadesService = new AtividadesServices();

export {atividadesService};
