import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-app-titre',
  templateUrl: './app-titre.component.html',
  styleUrl: './app-titre.component.scss',
})
export class AppTitreComponent {
  @Input() titre: string = '';
  @Input() class: string = '';
}
