import { Component } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  @Output()
  menuClick = new EventEmitter<void>();

  abrirMenu(): void {
  this.menuClick.emit();
}
}
