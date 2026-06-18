import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor, CurrencyPipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-categories-modal',
  standalone: true,
  imports: [NgFor, CurrencyPipe, DecimalPipe],
  templateUrl: './categories-modal.html',
  styleUrls: ['./categories-modal.css'],
})
export class CategoriesModal {
  @Output()
  close = new EventEmitter<void>();

  @Input()
  categories: {
    name: string;
    value: number;
    percentage: number;
  }[] = [];
}
