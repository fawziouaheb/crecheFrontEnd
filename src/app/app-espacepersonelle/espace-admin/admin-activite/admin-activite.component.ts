import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Activite, ActiviteRestControllerService } from '../../../api-client';

@Component({
  selector: 'app-admin-activite',
  templateUrl: './admin-activite.component.html',
  styleUrl: './admin-activite.component.css',
})
export class AdminActiviteComponent implements OnInit {
  activites: Activite[] = [];
  showForm: boolean = false;
  newActivite: Activite = {};
  editMode: boolean = false;
  selectedActiviteId: number | null = null;
  selectedImage: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;


  constructor(
    private activiteService: ActiviteRestControllerService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getAllActivites();
  }

  getAllActivites(): void {
    this.activiteService.getAllActivites().subscribe({
      next: (data) => (this.activites = data),
      error: (err) =>
        console.error('Erreur lors de la récupération des activités:', err),
    });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    this.newActivite = {};
    this.editMode = false;
    this.selectedImage = null;
    this.imagePreview = null;

  }

  onImageChange(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedImage = event.target.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.selectedImage!);
    } else {
      this.selectedImage = null;
      this.imagePreview = null;
      console.error('Aucun fichier sélectionné.');
    }
  }




  createOrUpdateActivite(): void {
    if (!this.selectedImage) {
      console.error('Aucun fichier sélectionné.');
      return;
    }

    // Crée un objet FormData pour envoyer le fichier
    const formData = new FormData();
    formData.append('file', this.selectedImage, this.selectedImage.name); // Ajoute le fichier à FormData

    // Récupère le Blob du fichier (le fichier sélectionné)
    const fileBlob = formData.get('file') as Blob; // Récupère le Blob du FormData

    // Vérifie si nous avons bien un Blob
    if (fileBlob) {
      this.activiteService.uploadImage(fileBlob).subscribe({
        next: (response) => {
          if (response && response['imageUrl']) {
            const imageUrl = response['imageUrl']; // Récupère l'URL de l'image
            this.newActivite.imageUrl = imageUrl; // Ajoute l'URL de l'image à l'activité

            if (this.editMode && this.selectedActiviteId) {
              // Mode édition : met à jour l'activité existante
              this.activiteService
                .updateActivite(this.selectedActiviteId, this.newActivite)
                .subscribe({
                  next: () => {
                    this.getAllActivites(); // Rafraîchit la liste des activités
                    this.toggleForm(); // Masque le formulaire
                  },
                  error: (err) =>
                    console.error('Erreur lors de la mise à jour:', err),
                });
            } else {
              // Mode création : crée une nouvelle activité
              this.activiteService.createActivite(this.newActivite).subscribe({
                next: (createdActivite) => {
                  this.activites.push(createdActivite); // Ajoute la nouvelle activité à la liste
                  this.toggleForm(); // Masque le formulaire
                },
                error: (err) =>
                  console.error('Erreur lors de la création:', err),
              });
            }
          } else {
            console.error(
              "Réponse de l'API invalide : l'URL de l'image est manquante."
            );
          }
        },
        error: (err) => {
          console.error("Erreur lors de l'upload de l'image:", err);
          alert(
            "Une erreur est survenue lors de l'upload de l'image. Veuillez réessayer."
          );
        },
      });
    } else {
      console.error(
        "Le fichier sélectionné n'a pas été trouvé dans le FormData."
      );
    }
  }

  editActivite(activite: Activite): void {
    this.newActivite = { ...activite };
    this.selectedActiviteId = activite.id || null;
    this.editMode = true;
    this.showForm = true;
    this.imagePreview = activite.imageUrl || null;

  }

  deleteActivite(id: number | undefined): void {
    if (id && confirm('Voulez-vous vraiment supprimer cette activité ?')) {
      this.activiteService.deleteActivite(id).subscribe({
        next: () =>
          (this.activites = this.activites.filter((a) => a.id !== id)),
        error: (err) => console.error('Erreur lors de la suppression:', err),
      });
    }
  }
}
