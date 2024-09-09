import { IParamsPesquisaGeral } from '../../interfaces';
import { BaseService } from '../base';

export class OportunidadesServices extends BaseService {
    protected path: string = '/Oportunidade';

    listarOportunidade(params: IParamsPesquisaGeral) {
        return this.get({
            endPoint: 'Listar',
            params: {
                filter: JSON.stringify(params.filter),
                fields: JSON.stringify(params.fields),
                limit: params.limit,
                page: params.page
            }
        })
    }
}

const oportunidadesService = new OportunidadesServices();

export {oportunidadesService};
