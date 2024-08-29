export interface IErrorResponse {
    code: string;
    message: string;
    response: {
        status: number;
        statusText: string;
        data: {
            Message: string;
            ErrorCode: number;
        };
    };
    config: any;
}

export interface IResponse {
    status: number;
    Total: number;
    First: boolean;
    Last: boolean;
    Content: any;
}

export interface ISort {
    property: string;
    direction: 'ASC' | 'DESC';
}

export interface IListagemBase {
    sort?: Array<ISort>;
    page?: number;
    limit?: number;
    fields?: Array<string>;
    includes?: Array<string>;
    excludes?: Array<string>;
    filter?: Array<IFilter>;
}

export type Operators =
    | 'equal'
    | 'contains'
    | 'greater'
    | 'greaterOrEqual'
    | 'in'
    | 'inOrNull'
    | 'less'
    | 'lessOrEqual'
    | 'startswith'
    | 'endswith';

export interface IFilter {
    property: string;
    operator: Operators;
    value?: string | number | boolean | Date | Array<string | number | boolean | Date>;
    and?: boolean;
    not?: boolean;
}

export interface IIdentificadorUnidadeAmbienteUsuario {
    Id: number;
    Fantasia: string;
}

export interface IIdentificadorUnidade extends IIdentificadorTenant {
    CodigoUnidade?: number;
    Unidade?: any;
}

export interface IIdentificadorTenant extends IIdentificador {
    CodigoTenant?: number;
    Tenant?: any;
}

export interface IIdentificador {
    Id?: number;
    DataCriacao?: Date;
    DataAlteracao?: Date;
    CodigoUsuarioCriacao?: number;
    CodigoUsuarioAlteracao?: number;
}

export interface ICodigoDTO {
    Codigo: number;
}

export interface ICodigoNomeDTO extends ICodigoDTO {
    Nome: string;
}

export interface ICodigoDescricaoDTO extends ICodigoDTO {
    Descricao: string;
}
