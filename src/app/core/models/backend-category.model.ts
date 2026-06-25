export interface BackendCategory {
  id: number;

  nome: string;

  tipo: 'entrada' | 'saida';

  usuarioId: number;

  usuarioNome?: string;
}
