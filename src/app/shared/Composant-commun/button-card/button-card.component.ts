import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-card',
  templateUrl: './button-card.component.html',
  styleUrl: './button-card.component.scss',
})
export class ButtonCardComponent {
  @Input() titre!: string;
  @Input() corps!: string;
  @Input() bgColor!: string; // Classe CSS pour changer la couleur
  @Input() allerVers!: string; // Lien de redirection
}
