export interface BackendTransaction {
  id: number;

  descricao: string;

  valor: number;

  data: string;

  criadaEm?: string;

  categoriaId: number;

  categoriaNome: string;

  usuarioId: number;

  usuarioNome?: string;

  contaId?: number | null;

  contaDescricao?: string | null;
}

export interface CreateBackendTransaction {
  descricao: string;

  valor: number;

  data: string;

  categoriaId: number;

  usuarioId: number;

  contaId?: number | null;
}
