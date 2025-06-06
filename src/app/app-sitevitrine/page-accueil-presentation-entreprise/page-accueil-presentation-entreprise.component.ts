import { Component, OnInit } from '@angular/core';
import { CRECHE_DATA } from '../../constant/creche-data/creche-data';
import { StructureRestControllerService } from '../../api-client';
import { ROUTES } from '../../constant/router-constant/router-constant';

interface CrecheData {
  structureName: string;
  image: string;
  place: number;
  adresse: string;
}

@Component({
  selector: 'app-page-accueil-presentation-entreprise',
  templateUrl: './page-accueil-presentation-entreprise.component.html',
  styleUrls: ['./page-accueil-presentation-entreprise.component.scss'],
})
export class PageAccueilPresentationEntrepriseComponent implements OnInit {
  CRECHE_DATA: CrecheData[] = [];
  routes = ROUTES;
  public motifCreche = CRECHE_DATA.motifCreche;
  public adresseCreches = CRECHE_DATA.adresseCreches;

  constructor(
    private structureControllerService: StructureRestControllerService
  ) {}

  ngOnInit(): void {
    this.loadStructuresAbbeville();
  }
  // Charger la liste des structures de Abbeville
  loadStructuresAbbeville(): void {
    this.structureControllerService
      .getStructureAbbeville()
      .subscribe((structures: any) => {
        console.log(structures);
        this.CRECHE_DATA = structures.map((item: any) => ({
          structureName: item.structureName,
          image: '../../assets/resources/accueil_present_creche_2.jpg',
          place: item.capacity,
          adresse: item.adresse,
        }));
      });
  }
}
