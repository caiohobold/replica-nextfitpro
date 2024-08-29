import { BaseService } from '../base';
import { IListagemBase } from '../../interfaces';

class EnumService extends BaseService {
    protected path = 'Enum';

    async recuperarTodos(params?: IListagemBase) {
        return this.get({
            params,
            endPoint: 'RecuperarTodos',
        });
    }
}

const enumService = new EnumService();

export default enumService;
