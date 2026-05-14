import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transaction-modal',

  imports: [FormsModule],

  templateUrl: './transaction-modal.html',

  styleUrl: './transaction-modal.css',
})
export class TransactionModal implements OnChanges {
  @Output()
  close = new EventEmitter<void>();

  @Output()
  save = new EventEmitter<any>();

  @Input()
  transactionData: any = null;

  closeModal() {
    this.close.emit();
  }

  saveTransaction() {
    this.save.emit(this.newTransaction);

    this.closeModal();
  }

  newTransaction = {
    descricao: '',

    valor: '',

    tipo: 'entrada',

    categoria: '',

    data: '',
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['transactionData'] && this.transactionData) {
      this.newTransaction = {
        ...this.transactionData,

        valor: this.transactionData.valor

          .replace('+ R$ ', '')

          .replace('- R$ ', ''),
      };
    }
  }
}
