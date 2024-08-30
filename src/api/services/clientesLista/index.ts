import { BaseService } from '../base';

export class ClientesListaService extends BaseService {
    protected path: string = '/Cliente';

    recuperarPesquisaGeral() {
        return this.get({
            endPoint: 'recuperarPesquisaGeral',
        });
    }
}

const clienteListaService = new ClientesListaService();

export default clienteListaService;
