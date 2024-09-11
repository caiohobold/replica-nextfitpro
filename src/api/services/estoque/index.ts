import { IParamsPesquisaGeral } from '../../interfaces';
import { BaseService } from '../base';

export class EstoqueListService extends BaseService {
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

export class EstoqueEditService extends BaseService {
    protected path: string = '/itemestoque';

    listarEstoque(itemData: any) {
        return this.get({
            endPoint: '',
            params: itemData
        })
    }
}

const estoqueService = new EstoqueListService();
const estoqueEditService = new EstoqueEditService();

export {estoqueService, estoqueEditService};
