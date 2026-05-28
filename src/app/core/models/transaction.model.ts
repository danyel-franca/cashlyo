export interface Transaction {

  id: number;

  descricao: string;

  valor: number;

  tipo: 'entrada' | 'saida';

  categoria: string;

  data: string;

  status: 'Concluído' | 'Pendente';

}
