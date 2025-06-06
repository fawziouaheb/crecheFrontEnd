import { Component } from '@angular/core';
import { ROUTES } from '../../../constant/router-constant/router-constant';

@Component({
  selector: 'app-app-head-mon-espace',
  templateUrl: './app-head-mon-espace.component.html',
  styleUrl: './app-head-mon-espace.component.scss',
})
export class AppHeadMonEspaceComponent {
  public urlLogin: string = ROUTES.LOGIN;
}
