import { IParamsPesquisaGeral } from '../../interfaces';
import { BaseService } from '../base';

export class EstoqueService extends BaseService {
    protected path: string = '/Item';

    listarEstoque(params: IParamsPesquisaGeral) {
        return this.get({
            endPoint: '',
            params: {
                filter: JSON.stringify(params.filter),
                fields: JSON.stringify(params.fields),
                limit: params.limit,
                page: params.page,
                includes: JSON.stringify(params.includes)
            }
        })
    }
}

const estoqueService = new EstoqueService();

export {estoqueService};
