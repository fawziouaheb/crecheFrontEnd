import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { catchError, map, Observable, of, Subscription, tap } from 'rxjs';
import { FormManagerService } from './services/preinscription-form-manager.service';
import {
  ApiResponseObject,
  PreinscriptionDto,
  StructureRestControllerService,
} from '../../api-client';
import { ToastrService } from 'ngx-toastr';
import { PreinscriptionRestControllerService } from '../../api-client/api/preinscriptionRestController.service';

@Component({
  selector: 'app-page-preinscription',
  templateUrl: './page-preinscription.component.html',
  styleUrls: ['./page-preinscription.component.scss'],
})
export class PagePreinscriptionComponent implements OnInit, OnDestroy {
  @Input() mode: 'creation' | 'modification' | 'visualisation' = 'creation';

  protected preInscriptionForm!: FormGroup;

  public SituationFamilleEnum = PreinscriptionDto.SituationFamilleEnum;
  public JoursChoisisEnum = PreinscriptionDto.JoursChoisisEnum;

  public sexeOptions = [
    { label: 'Garçon', value: PreinscriptionDto.SexeEnum.Masculin },
    { label: 'Fille', value: PreinscriptionDto.SexeEnum.Feminin },
  ];

  public situationOptions = [
    { label: 'Marié(e)', value: PreinscriptionDto.SituationFamilleEnum.Marie },
    {
      label: 'Union libre / Concubinage',
      value: PreinscriptionDto.SituationFamilleEnum.UnionLibre,
    },
    { label: 'Pacsé(e)', value: PreinscriptionDto.SituationFamilleEnum.Pacse },
    {
      label: 'Divorcé(e)',
      value: PreinscriptionDto.SituationFamilleEnum.Divorce,
    },
    {
      label: 'Séparé(e)',
      value: PreinscriptionDto.SituationFamilleEnum.Separe,
    },
    {
      label: 'Célibataire / Parent isolé',
      value: PreinscriptionDto.SituationFamilleEnum.Celibataire,
    },
    {
      label: 'Veuf / Veuve',
      value: PreinscriptionDto.SituationFamilleEnum.Veuf,
    },
  ];

  public gardeEnfantOption = [
    { label: 'Monsieur', value: PreinscriptionDto.GardeEnfantEnum.Monsieur },
    { label: 'Madame', value: PreinscriptionDto.GardeEnfantEnum.Madame },
    {
      label: 'Garde alternée',
      value: PreinscriptionDto.GardeEnfantEnum.Alternee,
    },
  ];

  public joursDisponibles = [
    { label: 'Lundi', value: this.JoursChoisisEnum.Lundi },
    { label: 'Mardi', value: this.JoursChoisisEnum.Mardi },
    { label: 'Mercredi', value: this.JoursChoisisEnum.Mercredi },
    { label: 'Jeudi', value: this.JoursChoisisEnum.Jeudi },
    { label: 'Vendredi', value: this.JoursChoisisEnum.Vendredi },
  ];

  public formulesHeures = [
    {
      label: '50 heures et plus',
      value: PreinscriptionDto.NombreHeuresParSemaineEnum.CinquantePlus,
    },
    {
      label: '40 à 49 heures',
      value: PreinscriptionDto.NombreHeuresParSemaineEnum.QuaranteACinquante,
    },
    {
      label: '30 à 39 heures',
      value: PreinscriptionDto.NombreHeuresParSemaineEnum.TrenteAQuarante,
    },
    {
      label: '20 à 29 heures',
      value: PreinscriptionDto.NombreHeuresParSemaineEnum.VingtATrente,
    },
    {
      label: '0 à 19 heures',
      value: PreinscriptionDto.NombreHeuresParSemaineEnum.ZeroADixNeuf,
    },
  ];

  public currentStep = 1;
  private _subs: Subscription[] = [];
  public structuresOptions$?: Observable<{ label: string; value: string }[]>;

  constructor(
    private formManager: FormManagerService,
    private fb: FormBuilder,
    private toast: ToastrService,
    private preinscriptionService: PreinscriptionRestControllerService,
    private structureControllerService: StructureRestControllerService
  ) {}

  ngOnInit(): void {
    this.preInscriptionForm = this.formManager.createPreInscriptionForm();
    this.structuresOptions$ = this.loadStructureNames().pipe(
      map((names: string[]) =>
        names.map((name) => ({ label: name, value: name }))
      )
    );

    if (this.mode !== 'visualisation') {
      this.formManager.addParent(this.preInscriptionForm);
      this.initDynamicFormListeners();
    } else {
      this.preInscriptionForm.disable();
    }
  }

  get isReadonly(): boolean {
    return this.mode === 'visualisation';
  }

  private initDynamicFormListeners(): void {
    const enfantNeeControl = this.preInscriptionForm.get('enfantNee');
    const situationControl = this.preInscriptionForm.get('situationFamille');
    const gardeControl = this.preInscriptionForm.get('gardeEnfant');

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
        } else {
          dateNaissancePrevue?.setValidators([Validators.required]);
          dateNaissancePrevue?.updateValueAndValidity();
          dateNaissance?.clearValidators();
          dateNaissance?.reset();
        }

        dateNaissancePrevue?.updateValueAndValidity();
        dateNaissance?.updateValueAndValidity();
      });
      this._subs.push(sub);
    }

    if (situationControl && gardeControl) {
      const sub = situationControl.valueChanges.subscribe((value: string) => {
        if (
          value === PreinscriptionDto.SituationFamilleEnum.Divorce ||
          value === PreinscriptionDto.SituationFamilleEnum.Separe
        ) {
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

  public addParent(): void {
    this.formManager.addParent(this.preInscriptionForm);
  }

  public removeParent(index: number): void {
    this.formManager.removeParent(this.preInscriptionForm, index);
  }

  public get parents(): FormArray {
    return this.preInscriptionForm.get('parents') as FormArray;
  }

  public addFrereSoeur(): void {
    this.formManager.addFrereSoeur(this.preInscriptionForm);
  }

  public removeFrereSoeur(index: number): void {
    this.formManager.removeFrereSoeur(this.preInscriptionForm, index);
  }

  public get freresSoeurs(): FormArray {
    return this.preInscriptionForm.get('freresSoeurs') as FormArray;
  }

  public onJourChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const joursControl = this.preInscriptionForm.get('joursChoisis');
    const jours: string[] = joursControl?.value || [];

    if (input.checked) {
      if (!jours.includes(input.value)) {
        jours.push(input.value);
      }
    } else {
      const index = jours.indexOf(input.value);
      if (index !== -1) jours.splice(index, 1);
    }

    joursControl?.setValue(jours);
    joursControl?.updateValueAndValidity();
  }

  public getHoraireControl(jour: string, champ: 'heureDebut' | 'heureFin') {
    const horaires = this.preInscriptionForm.get('horaires') as FormArray;
    let group = horaires.controls.find(
      (ctrl) => ctrl.get('jour')?.value === jour
    );

    if (!group) {
      group = this.fb.group({ jour: [jour], heureDebut: [''], heureFin: [''] });
      horaires.push(group);
    }

    return group.get(champ) as FormControl;
  }

  private loadStructureNames(): Observable<string[]> {
    return this.structureControllerService.getAllStructuresNames().pipe(
      map((result: ApiResponseObject) => {
        return Array.isArray(result.data) ? result.data : [];
      }),
      catchError(this.handleError('loadStructureNames'))
    );
  }

  private handleError(operation: string) {
    return (error: any) => {
      console.error(`Erreur lors de ${operation} :`, error);
      return of([]);
    };
  }

  onSubmit(): void {
    this.preInscriptionForm.markAllAsTouched();

    if (this.preInscriptionForm.valid) {
      const dto: PreinscriptionDto = this.patchValueToDto(
        this.preInscriptionForm.value
      );

      this._subs.push(
        this.preinscriptionService.envoyerFormulaire(dto).subscribe({
          next: (response: any) => {
            const res = response as ApiResponseObject;
            if (res.success) {
              this.toast.success(
                res.message || 'Formulaire envoyé avec succès.'
              );
              this.preInscriptionForm.reset();
            } else {
              this.toast.error(res.message || 'Une erreur s’est produite.');
            }
          },
          error: () => {
            this.toast.error(
              'Une erreur est survenue lors de traitement de votre demande.'
            );
          },
        })
      );
    } else {
      const invalidFields = Object.entries(this.preInscriptionForm.controls)
        .filter(([_, control]) => control.invalid)
        .map(([name]) => name);

      if (invalidFields.length === 1) {
        this.toast.error(
          `Le champ "${invalidFields[0]}" est obligatoire ou invalide.`
        );
      } else {
        this.toast.error(
          `Plusieurs champs obligatoires sont manquants ou invalides.`
        );
      }
    }
  }

  private patchValueToDto(formValue: any): PreinscriptionDto {
    return {
      enfantNee: formValue.enfantNee,
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      sexe: formValue.sexe,
      dateNaissance: formValue.dateNaissance,
      dateNaissancePrevue: formValue.dateNaissancePrevue,
      datePrevueEntreeCreche: formValue.datePrevueEntreeCreche,
      situationFamille: formValue.situationFamille,
      gardeEnfant: formValue.gardeEnfant,
      informationsComplementaires: formValue.informationsComplementaires,
      joursChoisis: formValue.joursChoisis || [],
      parents: formValue.parents.map((p: any) => ({ ...p })),
      freresSoeurs: formValue.freresSoeurs.map((f: any) => ({ ...f })),
      horaires: formValue.horaires.map((h: any) => ({
        jour: h.jour,
        heureDebut: h.heureDebut,
        heureFin: h.heureFin,
      })),
      nombreHeuresParSemaine: formValue.nombreHeuresParSemaine,
      structureName: formValue.structureName,
    };
  }

  public goToNextStep(): void {
    this.currentStep++;
  }

  public goToPreviousStep(): void {
    this.currentStep--;
  }

  ngOnDestroy(): void {
    this._subs.forEach((sub) => sub.unsubscribe());
  }
}
