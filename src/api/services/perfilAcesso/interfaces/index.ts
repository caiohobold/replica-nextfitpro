export interface IPermissao {
    Permissao: number;
    isPermitido: boolean;
}

export interface IPermissaoIterator {
    [key: string]: IPermissao;
}
