import { ParentDto } from './../../../../api-client/model/parentDto';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  PersonRestControllerService,
  FileRestControllerService,
  HoraireDto,
  ChildDto,
} from '../../../../api-client';

@Component({
  selector: 'app-parent-details',
  templateUrl: './parent-details.component.html',
  styleUrls: ['./parent-details.component.css'],
})
export class ParentDetailsComponent implements OnInit {
  parent!: ParentDto; // Objet parent pour stocker les données
  parentId: any; // ID du parent
  selectedFile: File | null = null; // Fichier sélectionné pour le téléchargement
  horairesArray: HoraireDto[] = [];

  constructor(
    private route: ActivatedRoute,
    private personRestControllerService: PersonRestControllerService,
    private fileRestControllerService: FileRestControllerService
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID du parent depuis l'URL
    this.route.paramMap.subscribe((params) => {
      this.parentId = +params.get('id')!; // L'ID passé dans l'URL
      this.getParentDetails();
    });
  }

  // Méthode pour vérifier si c'est aujourd'hui
  isToday(index: number): boolean {
    const today = new Date().getDay(); // Obtenir le jour actuel (0 = Dimanche, 1 = Lundi, etc.)
    return today === index; // Comparer l'indice du jour actuel avec l'indice du tableau (0 pour Dimanche, 6 pour Samedi)
  }
  // Charger les détails du parent
  getParentDetails(): void {
    //Appel au service pour récupérer les détails du parent
    this.personRestControllerService.getParent(this.parentId).subscribe(
      (response: any) => {
        console.log(response.data);

        if (response.success) {
          this.parent = response.data;
          console.log(this.parent?.children?.[0]?.horaires?.length ?? 0);
        }
      },
      (error) => {
        console.error(
          'Erreur lors de la récupération des détails du parent',
          error
        );
      }
    );
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadFile() {
    if (!this.selectedFile) {
      alert('Veuillez sélectionner un fichier !');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = () => {
      const base64String = (reader.result as string).split(',')[1]; // Supprimer le préfixe "data:application/pdf;base64,"

      const uploadRequest = {
        idPackage: this.parentId,
        fileName: this.selectedFile?.name,
        fileData: base64String,
      };

      this.fileRestControllerService.uploadPdf(uploadRequest).subscribe(
        (response: any) => {
          alert('Fichier téléchargé avec succès !');
        },
        (error) => {
          console.error("Erreur lors de l'envoi du fichier", error);
        }
      );
    };

    reader.onerror = (error) => {
      console.error('Erreur lors de la lecture du fichier :', error);
    };
  }

  downloadFile(fileName: string) {
    if (!this.parentId) {
      alert('Aucun parent sélectionné !');
      return;
    }

    this.fileRestControllerService
      .downloadPdf(this.parentId, fileName)
      .subscribe(
        (response: any) => {
          if (!response || !response.fileBase64) {
            alert('Erreur : fichier introuvable !');
            return;
          }

          // 🔹 Convertir la chaîne Base64 en Blob PDFù
          const byteCharacters = atob(response.fileBase64);
          const byteArray = new Uint8Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteArray[i] = byteCharacters.charCodeAt(i);
          }

          const blob = new Blob([byteArray], { type: 'application/pdf' });

          // 🔹 Télécharger le fichier
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = fileName;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        },
        (error) => {
          console.error('Erreur lors du téléchargement :', error);
          alert('Erreur : impossible de télécharger le fichier !');
        }
      );
  }

  deleteFile(fileName: string) {
    if (!this.parentId) {
      alert('Aucun parent sélectionné !');
      return;
    }

    if (!confirm(`Voulez-vous vraiment supprimer le fichier "${fileName}" ?`)) {
      return;
    }

    this.fileRestControllerService.deletePdf(this.parentId, fileName).subscribe(
      (response: any) => {
        if (response.success) {
          alert('Fichier supprimé avec succès !');

          // 🔹 Mettre à jour la liste des fichiers après suppression
          // this.parent.files = this.parent.files.filter(file => file.fileName !== fileName);
        } else {
          alert('Erreur lors de la suppression du fichier !');
        }
      },
      (error) => {
        console.error('Erreur lors de la suppression :', error);
        alert('Impossible de supprimer le fichier !');
      }
    );
  }

  getHoraires(child: ChildDto): HoraireDto[] {
    return Array.from(child.horaires ?? []);
  }
}
