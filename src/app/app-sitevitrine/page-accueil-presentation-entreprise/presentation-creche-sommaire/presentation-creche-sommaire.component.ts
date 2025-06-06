import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CRECHE_SUMMARY_MENU } from '../../../constant/creche-data/creche-data';
import {
  ROUTES_SOMMAIRE,
  ROUTES,
  SOMMAIRE,
} from '../../../constant/router-constant/router-constant';

@Component({
  selector: 'app-presentation-creche-sommaire',
  templateUrl: './presentation-creche-sommaire.component.html',
  styleUrls: ['./presentation-creche-sommaire.component.scss'],
})
export class PresentationCrecheSommaireComponent {
  public summarTitres = CRECHE_SUMMARY_MENU;

  constructor(private router: Router) {}

  navigateToPlaceDisponible(): void {
    this.router.navigate([ROUTES_SOMMAIRE(SOMMAIRE.PLACE_DISPONIBLE)]);
  }
  navigateToProjectEducation(): void {
    this.router.navigate([ROUTES.EDUCATIONVALUES]);
  }
}
