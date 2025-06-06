import { Component } from '@angular/core';
import { ROUTES } from '../../../constant/router-constant/router-constant';

@Component({
  selector: 'app-app-head-menu',
  templateUrl: './app-head-menu.component.html',
  styleUrl: './app-head-menu.component.scss',
})
export class AppHeadMenuComponent {
  isNavbarCollapsed = true; // Variable pour savoir si le menu est ouvert ou non
  router = ROUTES;

  constructor() {}

  ngOnInit(): void {
    // Code d'initialisation si nécessaire
  }

  toggleNavbar(): void {
    this.isNavbarCollapsed = !this.isNavbarCollapsed; // Bascule l'état du menu
  }
}
