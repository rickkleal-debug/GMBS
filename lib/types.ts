export type StatusCorretor = "ativo" | "inativo";
export type StatusPagamento = "pago" | "pendente";

export interface Corretor {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  creci: string;
  comissaoPadrao: number; // percentual, ex: 4.5
  status: StatusCorretor;
  dataEntrada: string; // ISO date
  iniciais: string;
}

export interface Negocio {
  id: string;
  imovel: string;
  bairro: string;
  cidade: string;
  tipo: "Venda";
  valorVenda: number;
  corretorId: string;
  dataFechamento: string; // ISO date
  comissaoPercentual: number;
  statusPagamento: StatusPagamento;
  dataPagamento?: string;
}
