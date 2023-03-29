import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListePresentationComponent } from './liste-presentation.component';

@Component({
  selector: 'app-liste',
  standalone: true,
  imports: [CommonModule, ListePresentationComponent],
  template: `<app-liste-presentation></app-liste-presentation>`,
})
export class ListeComponent {}
