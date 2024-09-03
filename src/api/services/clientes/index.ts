import { BaseService } from '../base';

export class ClientesService extends BaseService {
    protected path: string = '/Cliente';

    recuperarPesquisaGeral() {
        return this.get({
            endPoint: 'recuperarPesquisaGeral',
        });
    }

    listarCliente(clienteId: number) {
        return this.get({
            endPoint: `Listar?filter=%5B%7B%22property%22%3A%22Id%22%2C%22operator%22%3A%22equal%22%2C%22value%22%3A%22${clienteId}%22%7D%5D`,
        });
    }

    recuperarResumo(clienteId: number) {
        return this.get({
            endPoint: `RecuperarResumo?Codigo=${clienteId}`,
            version: 'v2'
        })
    }

    inserirCliente({}) {
        return this.post({
            endPoint: 'Inserir',
            version: 'v2'
        })
    }
}

const clienteService = new ClientesService();

export default clienteService;
