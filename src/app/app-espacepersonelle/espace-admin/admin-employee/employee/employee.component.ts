import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  PersonRestControllerService,
  RoleRestControllerService,
  StructureRestControllerService,
} from '../../../../api-client';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  employeeForm!: FormGroup;
  structures: any[] = [];
  roles: any[] = [];

  constructor(
    private fb: FormBuilder,
    private personRestControllerService: PersonRestControllerService,
    private roleRestControllerService: RoleRestControllerService,
    private structureRestControllerService: StructureRestControllerService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dateBirth: ['', Validators.required],
      mobile: ['', Validators.required],
      typeContratct: ['', Validators.required],
      dateBeginContract: ['', Validators.required],
      dateEndContract: [''], // plus de Validators.required ici
      structureId: ['', Validators.required],
    });
  
    this.getRoles();
    this.getStructures();
  
    // Gestion des validateurs dynamiques
    this.employeeForm.get('typeContratct')?.valueChanges.subscribe(value => {
      const dateEndControl = this.employeeForm.get('dateEndContract');
      if (value === 'cdi') {
        dateEndControl?.clearValidators();
        dateEndControl?.reset(); // vide la valeur si CDI
      } else {
        dateEndControl?.setValidators(Validators.required);
      }
      dateEndControl?.updateValueAndValidity();
    });
  }
  

  // Récupérer la liste des structures existantes dans le système
  getStructures() {
    this.structureRestControllerService
      .getAllStructures()
      .subscribe((structures: any[]) => {
        this.structures = structures;
      });
  }

  // Récupérer la liste des roles existants dans le système
  getRoles(): void {
    this.roleRestControllerService.getAllRoles().subscribe((roles: any[]) => {
      this.roles = roles;
    });
  }
  // Méthode pour soumettre le formulaire
  onSubmit(): void {
    if (this.employeeForm.valid) {
      const employeeData = this.employeeForm.value;
      // Réinitialiser le formulaire après soumission
      this.personRestControllerService.add2(employeeData).subscribe(
        (response: any) => {
          // Si l'ajout réussit

          if (response.success) {
            this.employeeForm.reset(); // Réinitialiser le formulaire
            this.toast.success(
              response.message || 'Votre demande a été traité avec success.'
            );
          } else {
            this.toast.error(response.message || 'Une erreur s’est produite.');
          }
        },
        (error) => {
          this.toast.error('Une erreur s’est produite.');
        }
      );
    } else {
      this.toast.error(
        'Le formulaire est ionvalid. Veuillez vérifier les champs.'
      );
    }
  }
}
