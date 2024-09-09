interface Atividade {
    Content?: AtividadeContent[];
  }

interface AtividadeContent {
  Id: number;
  Assunto?: string;
  Descricao?: string;
  Status: number;
  TipoAtividade: any;
  Inativo: boolean;
  DataHoraRealizada?: string;
  DataHoraPrevista: string;
}
