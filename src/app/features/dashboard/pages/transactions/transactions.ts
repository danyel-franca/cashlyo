import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { TransactionModal } from '../../components/transaction-modal/transaction-modal';

@Component({
  selector: 'app-transactions',
  standalone: true,

  imports: [CommonModule, TransactionModal],

  templateUrl: './transactions.html',
  styleUrl: './transactions.css',
})
export class TransactionsComponent {

  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  transactions = [
    {
      tipo: 'entrada',
      descricao: 'Salário',
      categoria: 'Trabalho',
      valor: '+ R$ 5.000',
      data: '07 Mai 2026',
      status: 'Concluído',
    },

    {
      tipo: 'saida',
      descricao: 'Netflix',
      categoria: 'Assinatura',
      valor: '- R$ 39',
      data: '06 Mai 2026',
      status: 'Concluído',
    },

    {
      tipo: 'saida',
      descricao: 'Mercado',
      categoria: 'Alimentação',
      valor: '- R$ 420',
      data: '05 Mai 2026',
      status: 'Pendente',
    },

    {
      tipo: 'entrada',
      descricao: 'Freelance',
      categoria: 'Projetos',
      valor: '+ R$ 850',
      data: '03 Mai 2026',
      status: 'Concluído',
    },
  ];
}
