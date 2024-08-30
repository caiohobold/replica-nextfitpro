import {getAmbienteUsuario} from './util';
import {IUsuario} from '../../api/services/usuario/interfaces';

const useAmbienteUsuario = () => {
    const ambienteUsuario = getAmbienteUsuario();

    const possuiGympass = ambienteUsuario?.TemGympass;

    const recuperarUsuarioLogado = (): IUsuario => {
        const ambiente = getAmbienteUsuario();
        if (!ambiente) return null as any;
        return <IUsuario>{
            Id: ambiente.Id,
            Nome: ambiente.Nome,
            Email: ambiente.Email,
            TemGympass: ambiente.TemGympass,
        };
    };

    return {
        recuperarUsuarioLogado,
        possuiGympass,
    };
};

export default useAmbienteUsuario;
