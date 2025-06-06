import { Component, OnInit } from '@angular/core';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { StructureRestControllerService } from '../../../api-client';
import { Router } from '@angular/router';  // <-- Ajouter cette ligne

interface CrecheData {
  structureName: string;
  image: string;
  place: number;
  adresse: string;
}

@Component({
  selector: 'app-page-accueil-place-disponible-creche',
  templateUrl: './page-accueil-place-disponible-creche.component.html',
  styleUrls: ['./page-accueil-place-disponible-creche.component.scss'],
})
export class PageAccueilPlaceDisponibleCrecheComponent implements OnInit {
  structures$: Observable<any[]> = of([]); // Initialisation par défaut

  constructor(
    private structureService: StructureRestControllerService,
    private router: Router
  ) {}


  ngOnInit(): void {
    this.fetchStructures(); // Charger les données au démarrage
  }

  fetchStructures(): void {
    this.structures$ = this.structureService.getAllStructures().pipe(
      map((structures) => {
        console.log('Structures récupérées depuis l’API :', structures); // Ajout du log
        return structures.map((structure) => ({
          id: structure.id, // Assure-toi que cet ID existe
          structureName: structure.structureName,
          image: structure.images ? structure.images[0] : 'default-image.jpg',
          capacity: structure.capacity,
          adresse: structure.adresse,
        }));
      })
    );
  }


  onClickVoirPlus(id: string): void {
    console.log('onClickVoirPlus déclenché');
    console.log('ID de la crèche:', id);
    this.router.navigate(['/fiche-creche', id]); // Naviguer vers la page de la crèche
  }
}
