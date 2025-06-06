import { Component, OnInit, AfterViewInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { StructureRestControllerService } from '../../api-client';
import * as L from 'leaflet';
import { ROUTES } from '../../constant/router-constant/router-constant';



@Component({
  selector: 'app-page-fiche-creche',
  templateUrl: './page-fiche-creche.component.html',
  styleUrls: ['./page-fiche-creche.component.css']
})
export class PageFicheCrecheComponent implements OnInit, AfterViewInit {
  structure: any;
  structureId: number = 0;
  images: string[] = [];
  currentIndex: number = 0;
  currentImage: string = '';

  map: L.Map | undefined;

  constructor(
    private route: ActivatedRoute,
    private structureService: StructureRestControllerService,
    private router: Router
  ) {}

  navigateToPreinscription(): void {
    this.router.navigate(['/', ROUTES.PREINSCRIPTION]);
  }


  ngOnInit(): void {
    this.structureId = +this.route.snapshot.paramMap.get('id')!;
    this.structureService.getStructureById(this.structureId).subscribe((data) => {
      this.structure = data;
      this.images = this.structure.images || [];
      this.currentImage = this.images[this.currentIndex];

      this.structure.avantages = typeof this.structure.avantages === 'string'
        ? this.structure.avantages.split(',')
        : this.structure.avantages || [];

      // Si les coordonnées sont déjà là, on peut appeler la carte
      if (this.structure.lat && this.structure.log) {
        this.loadMap(this.structure.lat, this.structure.log);
      }
    });
  }

  ngAfterViewInit(): void {
    // Attente que les coordonnées soient récupérées via API (ou appel retardé dans ngOnInit)
    // Sinon ce bloc peut être vide si map est appelée uniquement dans ngOnInit
  }

  prevImage(): void {
    this.currentIndex = (this.currentIndex > 0) ? this.currentIndex - 1 : this.images.length - 1;
    this.currentImage = this.images[this.currentIndex];
  }

  nextImage(): void {
    this.currentIndex = (this.currentIndex < this.images.length - 1) ? this.currentIndex + 1 : 0;
    this.currentImage = this.images[this.currentIndex];
  }

  loadMap(lat: number, lng: number): void {
    if (this.map) return;

    this.map = L.map('leafletMapDetails').setView([lat, lng], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    L.marker([lat, lng]).addTo(this.map)
      .bindPopup('Position de la structure')
      .openPopup();
  }

  protected readonly ROUTES = ROUTES;
}
