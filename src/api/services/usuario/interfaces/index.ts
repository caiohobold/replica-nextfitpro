export interface IUsuario {
    Id?: number;
    Nome: string;
    Email: string;
    TemRecebaFacil: boolean;
    TemGympass: boolean;
}

export interface IAmbienteUsuario {
    CodigoTenant: number;
    CodigoUnidade: number;
    Id?: number;
    Nome: string;
    Email: string;
    TemGympass: boolean;
}
