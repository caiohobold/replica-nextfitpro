interface Oportunidade {
    Content?: OportunidadeContent[];
  }

interface OportunidadeContent {
  Id: number;
  CodigoPessoa: number;
  Status: number;
  DataCriacao: string;
  Descricao: string;
}