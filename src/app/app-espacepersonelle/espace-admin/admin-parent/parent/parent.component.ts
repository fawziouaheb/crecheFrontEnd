import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import {
  PersonRestControllerService,
  StructureRestControllerService,
} from '../../../../api-client';
import { ChildDto, ParentDto } from './interface';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css'],
})
export class ParentComponent implements OnInit {
  parentForm!: FormGroup;
  message: string | null = null;
  structures: any[] = [];
  selectedDays: string[] = [];

  constructor(
    private fb: FormBuilder,
    private personRestControllerService: PersonRestControllerService,
    private structureRestControllerService: StructureRestControllerService
  ) {}

  ngOnInit(): void {
    this.parentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required],
      address: ['', Validators.required], // Adresse du premier parent
      dateBirth: ['', Validators.required], // Date de naissance à ajouter si nécessaire
      profession: ['', Validators.required],
      familySituation: ['', Validators.required],

      secondParentFirstName: [''],
      secondParentLastName: [''],
      secondParentEmail: ['', Validators.email],
      secondParentMobile: [''],
      secondParentAddress: [''],
      secondParentProfession: [''],
      secondParentFamilySituation: [''],
      structureId: ['', Validators.required],
      children: this.fb.array([]),
    });

    this.getStructures();
  }

  get children(): FormArray {
    return this.parentForm.get('children') as FormArray;
  }

  addChild(): void {
    this.children.push(
      this.fb.group({
        lastName: ['', Validators.required],
        firstName: ['', Validators.required],
        dateBirth: ['', Validators.required],
        gender: ['', Validators.required],
        formula: ['', Validators.required],
        entryDate: ['', Validators.required], // Date d'entrée à ajouter
        daysOfCare: [],
        observation: [''], // Ajout de l'observation
      })
    );
  }

  removeChild(index: number): void {
    this.children.removeAt(index);
  }

  getStructures() {
    this.structureRestControllerService
      .getAllStructures()
      .subscribe((structures: any[]) => {
        this.structures = structures;
      });
  }

  onDayChange(event: any, childIndex: number): void {
    const day = event.target.value;
    const childFormGroup = this.children.at(childIndex) as FormGroup; // Trouver l'enfant spécifique
    let daysOfCare = childFormGroup.get('daysOfCare')!.value || []; // Liste actuelle des jours

    if (event.target.checked) {
      // Ajouter le jour si coché
      daysOfCare.push(day);
    } else {
      // Retirer le jour si décoché
      daysOfCare = daysOfCare.filter((d: string) => d !== day);
    }

    // Mettre à jour uniquement l'enfant concerné
    childFormGroup.patchValue({ daysOfCare });
  }

  onSubmit(): void {
    const parentFormValue = this.parentForm.value;

    if (!this.parentForm.invalid) {
      // Mapping des données du formulaire vers le ParentDto
      const parentDto: ParentDto = {
        firstName: parentFormValue.firstName,
        lastName: parentFormValue.lastName,
        email: parentFormValue.email,
        dateBirth: parentFormValue.dateBirth, // Date de naissance à ajouter si nécessaire
        mobile: parentFormValue.mobile,
        address: parentFormValue.address,
        secondParentFirstName: parentFormValue.secondParentFirstName,
        secondParentLastName: parentFormValue.secondParentLastName,
        secondParentEmail: parentFormValue.secondParentEmail,
        secondParentMobile: parentFormValue.secondParentMobile,

        profession: parentFormValue.profession,
        familySituation: parentFormValue.familySituation,
        secondParentProfession: parentFormValue.secondParentProfession,
        secondParentFamilySituation:
          parentFormValue.secondParentFamilySituation,
        structureId: parentFormValue.structureId,
        children: parentFormValue.children.map((child: any) => {
          // Mapping des données des enfants vers ChildDto
          const childDto: ChildDto = {
            entryDate: child.entryDate, // Date d'entrée actuelle
            lastName: child.lastName,
            firstName: child.firstName,
            date_birth_child: child.dateBirth,
            genre: child.gender,
            formula: child.formula,
            daysOfCare: child.daysOfCare,
            observation: child.observation || '', // Ajouter observation si vide
          };
          return childDto;
        }),
      };
      console.log('parentDto:', parentDto); // Debug: Afficher le contenu de parentDto dans la console
      this.personRestControllerService.addParent(parentDto).subscribe(
        (response: any) => {
          // Si l'ajout réussit
          if (response.success) {
            this.message = response.message; // Message de succès venant du backend
            this.parentForm.reset(); // Réinitialiser le formulaire
          }
        },
        (error) => {
          // Si une erreur survient
          console.error('Erreur reçue :', error);
          if (error.error && error.error.message) {
            this.message = error.error.message; // Affiche le message d'erreur provenant du backend
          } else {
            this.message =
              'Une erreur est survenue lors de l’envoi du formulaire.'; // Message générique
          }
        }
      );
    } else {
      this.message = 'Une erreur est survenue lors de l’envoi du formulaire.s';
    }
    // Ici, vous pouvez envoyer parentDto à votre service pour l'envoyer au backend
    // Exemple: this.personRestControllerService.createParent(parentDto).subscribe(response => { ... });
  }
}
