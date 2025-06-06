import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormManagerService } from '../app-sitevitrine/page-preinscription/services/preinscription-form-manager.service';

@Component({
  selector: 'app-app-test-layout',
  templateUrl: './app-test-layout.component.html',
  styleUrls: ['./app-test-layout.component.scss'],
})
export class AppTestLayoutComponent implements OnInit, OnDestroy {
  protected preInscriptionForm!: FormGroup;
  protected sexeOptions = ['Fille', 'Garçon'];
  protected situationOptions = [
    'Marié(e)',
    'Pacsé(e)',
    'Concubinage',
    'Divorcé(e)',
    'Séparé(e)',
    'Parent isolé',
  ];
  protected gardeEnfantOption = ['Monsieur', 'Madame', 'Alternée'];

  public currentStep = 1;

  private _subs: Subscription[] = [];

  constructor(private preInscriptionFormManager: FormManagerService) {}

  ngOnInit(): void {
    this.preInscriptionForm =
      this.preInscriptionFormManager.createPreInscriptionForm();
    this.initDynamicFormListeners();
    this.preInscriptionFormManager.addParent(this.preInscriptionForm);
  }

  private initDynamicFormListeners(): void {
    const enfantNeeControl = this.preInscriptionForm.get('enfantNee');

    if (enfantNeeControl) {
      const sub = enfantNeeControl.valueChanges.subscribe((isNee: boolean) => {
        const dateNaissance = this.preInscriptionForm.get('dateNaissance');
        const dateNaissancePrevue = this.preInscriptionForm.get(
          'dateNaissancePrevue'
        );

        if (isNee) {
          dateNaissance?.setValidators([Validators.required]);
          dateNaissance?.updateValueAndValidity();

          dateNaissancePrevue?.clearValidators();
          dateNaissancePrevue?.reset();
          dateNaissancePrevue?.updateValueAndValidity();
        } else {
          dateNaissancePrevue?.setValidators([Validators.required]);
          dateNaissancePrevue?.updateValueAndValidity();

          dateNaissance?.clearValidators();
          dateNaissance?.reset();
          dateNaissance?.updateValueAndValidity();
        }
      });

      this._subs.push(sub);
    }

    const situationControl = this.preInscriptionForm.get('situationFamille');
    const gardeControl = this.preInscriptionForm.get('gardeEnfant');

    if (situationControl && gardeControl) {
      const sub = situationControl.valueChanges.subscribe((value: string) => {
        if (value === 'Divorcé(e)' || value === 'Séparé(e)') {
          gardeControl.setValidators([Validators.required]);
        } else {
          gardeControl.clearValidators();
          gardeControl.setValue(null);
        }
        gardeControl.updateValueAndValidity();
      });

      this._subs.push(sub);
    }
  }

  addParent(): void {
    this.preInscriptionFormManager.addParent(this.preInscriptionForm);
  }

  removeParent(index: number): void {
    this.preInscriptionFormManager.removeParent(this.preInscriptionForm, index);
  }

  get parents(): FormArray {
    return this.preInscriptionForm.get('parents') as FormArray;
  }

  onSubmit(): void {
    this.preInscriptionForm.markAllAsTouched();

    if (this.preInscriptionForm.valid) {
      console.log('✅ Données envoyées :', this.preInscriptionForm.value);
    } else {
      console.log('❌ Formulaire invalide');
    }
  }

  goToNextStep(): void {
    this.currentStep++;
  }

  goToPreviousStep(): void {
    this.currentStep--;
  }

  ngOnDestroy(): void {
    this._subs.forEach((sub) => sub.unsubscribe());
  }
}
