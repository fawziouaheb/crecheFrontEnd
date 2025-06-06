import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import {
  StructureRestControllerService,
  CandidateRestControllerService,
} from '../../api-client';
import { ErrorHandlerService } from '../../shared/services-commun/error-handler.service';
import { FormManagerService } from './service/candidate-form-manager.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-page-candidate',
  templateUrl: './page-candidate.component.html',
  styleUrl: './page-candidate.component.css',
})
export class PageCandidateComponent implements OnInit {
  //définition des variables
  candidateForm!: FormGroup;
  structures: { id: number; name: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private structureService: StructureRestControllerService,
    private candidateService: CandidateRestControllerService,
    private formManager: FormManagerService,
    private errorHandler: ErrorHandlerService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.candidateForm = this.formManager.createCandidateForm();
    this.getAllStructures();
  }

  /**
   * Envoie du formulaire.
   */
  onSubmit(): void {
    if (this.candidateForm.invalid) {
      this.toast.error('Veuillez remplir tous les champs requis.');
      return;
    }
    // Récupération des valeurs du formulaire
    const candidateDto = { ...this.candidateForm.value };

    // Gestion du fichier CV
    const cvFile = this.candidateForm.get('cv')?.value;
    if (cvFile instanceof File) {
      const reader = new FileReader();
      reader.onload = () => {
        // Ajouter le fichier encodé en base64 dans le DTO
        candidateDto.cv = reader.result as string;
        // Appeler le service avec le DTO
        this.candidateService.add(candidateDto).subscribe({
          next: (response:any) => {
            if (response.success) {
              this.toast.success(
                response.message || 'Votre demande a été traité avec success.'
              );
              this.candidateForm.reset(); // Réinitialiser le formulaire après
            } else {
              this.toast.error(response.message || 'Une erreur s’est produite.');
            }
          },
          error: (error) => {
            this.toast.error('Une erreur s’est produite.');
          },
        });
      };

      reader.onerror = () => {
        this.toast.error('Une erreur s’est produite.');
      };
      // Lire le fichier en base64
      reader.readAsDataURL(cvFile);
    } else {
      this.toast.error("Veuillez sélectionner un fichier PDF valide.");
    }
  }

  /**
   * Récupération de la liste des structures existantes depuis l'API.
   */
  getAllStructures(): void {
    this.structureService.getAllStructures().subscribe(
      (data) => {
        this.structures = data.map((item: any) => ({
          id: item.id,
          name: item.structureName,
        }));
      },
      (error) => {
        this.toast.error("Erreur lors de la récupération des structures.");
      }
    );
  }

  /**
   * Charger un fichier.
   */
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      if (file.type === 'application/pdf') {
        this.candidateForm.patchValue({ cv: file });
      } else {
        this.toast.error("Veuillez télécharger un fichier PDF uniquement");
        this.candidateForm.get('cv')?.setValue(null);
      }
    } else {
      this.candidateForm.get('cv')?.setValue(null);
    }
  }
}
