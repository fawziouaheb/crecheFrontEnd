import { Component, OnInit } from '@angular/core';
import { Activite, ActiviteRestControllerService } from '../../api-client';

@Component({
  selector: 'app-page-activite',
  templateUrl: './page-activite.component.html',
  styleUrl: './page-activite.component.css',
})
export class PageActiviteComponent implements OnInit {
  activites: Activite[] = [];
  currentIndex: number = 0;

  constructor(private activiteService: ActiviteRestControllerService) {}

  ngOnInit(): void {
    this.getAllActivites();
  }

  // ✅ Récupération des activités via l'API
  getAllActivites(): void {
    this.activiteService.getAllActivites().subscribe({
      next: (data) => {
        this.activites = data;
        console.log(this.activites.map((a) => a.imageUrl));
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des activités:', err);
      },
    });
  }

  // ✅ Création d'une nouvelle activité
  createActivite(newActivite: Activite): void {
    this.activiteService.createActivite(newActivite).subscribe({
      next: (createdActivite) => {
        this.activites.push(createdActivite);
      },
      error: (err) => {
        console.error("Erreur lors de la création de l'activité:", err);
      },
    });
  }

  // ✅ Navigation vers l'image précédente dans le carrousel
  prevImage(): void {
    this.currentIndex =
      this.currentIndex === 0
        ? this.activites.length - 1
        : this.currentIndex - 1;
  }

  // ✅ Navigation vers l'image suivante dans le carrousel
  nextImage(): void {
    this.currentIndex =
      this.currentIndex === this.activites.length - 1
        ? 0
        : this.currentIndex + 1;
  }

  convertToHtml(description: string | undefined): string {
    if (!description) {
      return '';
    }
    return description
      .split('\n')
      .map(line => `<p>${line}</p>`) // Remplacer chaque saut de ligne par un <p>
      .join('');
  }
}
