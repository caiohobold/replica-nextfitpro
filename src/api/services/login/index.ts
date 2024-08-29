import {BaseService} from '../base';
import {IRequestBase} from '../base/interfaces';
import {IResponse} from '../../interfaces';

class LoginService extends BaseService {
    protected path: string = '/UsuarioLogin';

    verificarUnidadePorEmail = async(email: string) => {
        return this.get({
            params: { email },
            endPoint: 'RecuperarTenantsPorEmail',
        });
    }

    override async get(request: IRequestBase): Promise<IResponse> {
        return super.get(request);
    }
}

const loginService = new LoginService();

export default loginService;