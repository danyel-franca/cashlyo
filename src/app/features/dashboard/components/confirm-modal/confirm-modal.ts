import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  imports: [],
  templateUrl: './confirm-modal.html',
  styleUrl: './confirm-modal.css',
})
export class ConfirmModal {
  @Output()
  close = new EventEmitter<void>();

  @Output()
  confirm = new EventEmitter<void>();

  @Input()
  transactionName = '';

  closeModal() {
    this.close.emit();
  }

  confirmDelete() {
    this.confirm.emit();
  }
}
