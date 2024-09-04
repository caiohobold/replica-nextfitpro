import { BaseService } from '../base';

export class ClientesService extends BaseService {
    protected path: string = '/Cliente';

    recuperarPesquisaGeral(page: number = 1) {
        return this.get({
            endPoint: 'recuperarPesquisaGeral',
            params: {
                limit: 50,
                page: page
            }
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

    inserirCliente(clienteData: any) {
        return this.post({
            endPoint: 'Inserir',
            version: 'v2',
            params: clienteData
        })
    }
}

const clienteService = new ClientesService();

export default clienteService;
