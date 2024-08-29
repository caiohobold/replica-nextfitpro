export interface IEnums {
    Version: number;
    Enums: Array<IEnum>;
}

export interface IEnum {
    Nome: string;
    Itens: Array<IEnumItens>;
}

export interface IEnumItens {
    Valor: number;
    Identificador: string;
    Texto: string;
}
