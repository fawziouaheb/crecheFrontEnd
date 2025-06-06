import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormManagerService {
  constructor(private fb: FormBuilder) {}
  createCandidateForm(): FormGroup {
    return this.fb.group({
      lastName: ['', [Validators.required, Validators.minLength(2)]], // Nom obligatoire avec une longueur minimale
      firstName: ['', [Validators.required, Validators.minLength(2)]], // Prénom obligatoire avec une longueur minimale
      email: ['', [Validators.required, Validators.email]], // Email obligatoire avec une validation d'email
      mobile: ['', [Validators.pattern(/^[0-9]{10}$/)]], // Mobile doit être numérique avec 10 chiffres (validation)
      city: ['', [Validators.required]], // Ville obligatoire
      contract: ['', [Validators.required]], // Contrat obligatoire (liste déroulante)
      dateFree: ['', [Validators.required]], // Date de disponibilité obligatoire
      cv: [null, [Validators.required]], // CV obligatoire
      motivation: [''] ,
      structureId: ['']// Champ optionnel pour un message
    });
  }
  
  
}
