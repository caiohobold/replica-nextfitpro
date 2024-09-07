interface Cliente {
  Id: number;
  CodigoTenant: number;
  CodigoUnidadePreferencial: number;
  Nome: string;
  NomeLimpo: string;
  Inativo: boolean;
  Sexo: number;
  DddFone: string;
  Fone: string;
  DataNascimento: string;
  TemResponsavel: boolean;
  CodigoClienteResponsavel: number;
  Origem: number;
  CodigoOrigem: number;
  Observacao: string | null;
  Email: string | null;
  Cpf: string | null;
  Rg: string | null;
  Objetivo: string | null;
  Cep: string;
  Endereco: string;
  NumEndereco: string;
  CompleEndereco: string | null;
  Bairro: string;
  CodigoCidade: number;
  CodigoUsuarioConsultor: number;
  CodigoUsuarioProfessor: number;
  ClienteParametro: {
    Id: number;
    Status: number;
    UrlImagem: string | null;
    Vip: boolean;
  };
  ClienteResponsavel: {
    Id: number;
    Nome: string;
  };
  UsuarioConsultor: {
    Id: number;
    Nome: string;
  };
  UsuarioProfessor: {
    Id: number;
    Nome: string;
  };
  Cidade: {
    Id: number;
    Descricao: string;
    Uf: string;
  };
  Contatos: any[];
}

interface ResumoCliente {
  Observacao: string | null;
  ValorSaldoDevedor: number;
  ValorEmAtraso: number;
  ValorCredito: number;
  ProximoVencto: string;
  ValorProximoVencto: number;
  Alertas: any[]; 
  Contratos: Contrato[];
  Dependentes: any[]; 
}

interface Contrato {
  Id: number;
  Descricao: string;
  DataValidade: string;
  Modalidades: Modalidade[];
}

interface Modalidade {
  Id: number;
  DescricaoModalidade: string;
  GradesHorarios: any[];
}

interface ClientePayload {
    NotificarWhatsApp: boolean;
    DddFone: string;
    Fone: string;
    CodigoUsuarioProfessor: number;
    TemResponsavel: boolean;
    CodigoClienteResponsavel: number;
    CodigoUsuarioConsultor: number;
    Rg: string;
    Cpf: string;
    Email: string;
    CodigoObjetivo: number;
    Sexo: number; // 1 para masculino, 2 para feminino
    DataNascimento: string; // Formato ISO8601 ("2004-12-13T02:00:00.000Z")
    Nome: string;
    CodigoCidade: number;
    Bairro: string;
    CompleEndereco: string;
    NumEndereco: string;
    Endereco: string;
    Cep: string;
}