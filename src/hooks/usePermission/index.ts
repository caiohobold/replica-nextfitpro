import _ from 'lodash';
import {getPermissoes} from './util';
import {getValueEnum} from '../../enums/utils';

const usePermission = () => {
    const possuiPermissao = (enumPermissao: string): boolean => {
        const codigoPermissao = getValueEnum('EnumPermissaoSistema', enumPermissao);

        if (!codigoPermissao) return false;

        const permissoes = getPermissoes();

        if (!permissoes) return false;

        const permissao = _.find(permissoes, (currentValue: any) => {
            // eslint-disable-next-line no-prototype-builtins
            if (currentValue.hasOwnProperty(codigoPermissao)) {
                return currentValue;
            }
            return null;
        });

        return permissao ? permissao.isPermitido : false;
    };

    return {
        possuiPermissao: possuiPermissao,
    };
};

export default usePermission;
