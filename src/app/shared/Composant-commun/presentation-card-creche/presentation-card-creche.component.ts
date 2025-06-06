import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-presentation-card-creche',
  templateUrl: './presentation-card-creche.component.html',
  styleUrl: './presentation-card-creche.component.scss',
})
export class PresentationCardCrecheComponent {
  @Input() src = '';
  @Input() places_dispo: string | number = '';
  @Input() adresse = '';
  @Input() structureName = '';
}
