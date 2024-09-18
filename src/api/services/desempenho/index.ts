import { BaseService } from '../base';

export class DesempenhoServices extends BaseService {
    protected path: string = '/desempenho';

    recuperarQuantClientesAtivos() {
        return this.get({
            endPoint: 'RecuperarQuantClientesAtivos',
        })
    }

    recuperarQuantNovosClientes() {
        return this.get({
            endPoint: 'RecuperarQuantNovosClientes',
        })
    }
}

const desempenhoService = new DesempenhoServices();

export {desempenhoService};
