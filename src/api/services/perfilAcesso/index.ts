import { BaseService } from '../base';

export class PerfilAcessoService extends BaseService {
    protected path: string = '/PerfilAcesso';

    recuperarPermissoesUsuarioLogado() {
        return this.get({
            endPoint: 'RecuperarPermissoesUsuarioLogado',
        });
    }
}

const perfilAcessoService = new PerfilAcessoService();

export default perfilAcessoService;
