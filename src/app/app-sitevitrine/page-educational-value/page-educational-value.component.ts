import { Component } from '@angular/core';

@Component({
  selector: 'app-page-educational-value',
  templateUrl: './page-educational-value.component.html',
  styleUrl: './page-educational-value.component.css',
})
export class PageEducationalValueComponent {
  // Variables pour contrôler l'état d'ouverture des sections
  isCollapsedEpanouissement = true;
  isCollapsedAutonomie = true;
  isCollapsedBienveillance = true;
  isCollapsedCoeeducation = true;

  // Méthodes pour inverser l'état de chaque section
  toggleEpanouissement() {
    this.isCollapsedEpanouissement = !this.isCollapsedEpanouissement;
  }

  toggleAutonomie() {
    this.isCollapsedAutonomie = !this.isCollapsedAutonomie;
  }

  toggleBienveillance() {
    this.isCollapsedBienveillance = !this.isCollapsedBienveillance;
  }

  toggleCoeeducation() {
    this.isCollapsedCoeeducation = !this.isCollapsedCoeeducation;
  }
}
