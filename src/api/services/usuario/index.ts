import {BaseService} from '../base';
import {IRequestBase} from '../base/interfaces';
import {IResponse} from '../../interfaces';

class UsuarioService extends BaseService {
    protected path: string = '/Usuario';

    recuperarAmbienteUsuario(codigoUsuario: number) {
        return this.get({
            params: {CodigoUsuario: codigoUsuario},
            endPoint: 'RecuperarAmbienteUsuario',
        });
    }

    recuperarUsuarioLogado() {
        return this.post({
            endPoint: 'RecuperarUsuarioLogado',
        });
    }

    override async get(request: IRequestBase): Promise<IResponse> {
        return super.get(request);
    }
}

const usuarioService = new UsuarioService();

export default usuarioService;
