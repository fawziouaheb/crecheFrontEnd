import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormManagerService {
  constructor(private fb: FormBuilder) {}

  createPreInscriptionForm(): FormGroup {
    return this.fb.group({
      enfantNee: [true, Validators.required],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      sexe: ['', Validators.required],
      dateNaissance: [null, [Validators.required]],
      dateNaissancePrevue: [null],
      datePrevueEntreeCreche: [null, Validators.required],
      situationFamille: ['', Validators.required],
      gardeEnfant: [null],
      parents: this.fb.array([]),
      freresSoeurs: this.fb.array([]),
      informationsComplementaires: [''],
      joursChoisis: [[], Validators.required],
      nombreHeuresParSemaine: ['', Validators.required],
      horaires: this.fb.array([], Validators.required),
      structureName: [null],
    });
  }

  getFrereSoeurForm(): FormGroup {
    return this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateNaissance: [null, Validators.required],
    });
  }

  getParentForm(): FormGroup {
    return this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateNaissance: [null, Validators.required],
      adresse: ['', Validators.required],
      telephoneDomicile: ['', [Validators.pattern(/^\d{10}$/)]],
      telephonePortable: [
        '',
        [Validators.required, Validators.pattern(/^\d{10}$/)],
      ],
      email: ['', [Validators.required, Validators.email]],
      profession: ['', Validators.required],
    });
  }

  getHoraireForm(): FormGroup {
    return this.fb.group({
      jour: ['', Validators.required],
      heureDebut: ['', Validators.required],
      heureFin: ['', Validators.required],
    });
  }

  addFrereSoeur(form: FormGroup): void {
    (form.get('freresSoeurs') as FormArray).push(this.getFrereSoeurForm());
  }

  removeFrereSoeur(form: FormGroup, index: number): void {
    (form.get('freresSoeurs') as FormArray).removeAt(index);
  }

  addParent(form: FormGroup): void {
    (form.get('parents') as FormArray).push(this.getParentForm());
  }

  removeParent(form: FormGroup, index: number): void {
    (form.get('parents') as FormArray).removeAt(index);
  }

  addHoraire(form: FormGroup): void {
    (form.get('horaires') as FormArray).push(this.getHoraireForm());
  }

  removeHoraire(form: FormGroup, index: number): void {
    (form.get('horaires') as FormArray).removeAt(index);
  }
}
