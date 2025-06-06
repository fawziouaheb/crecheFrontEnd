import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import {
  ApiResponseObject,
  PersonRestControllerService,
  RoleRestControllerService,
  StructureRestControllerService,
} from '../../../../api-client';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTES_ADMIN } from '../../../../constant/router-constant/router-constant';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrl: './employee-edit.component.css',
})
export class EmployeeEditComponent implements OnInit {
  employeeForm!: FormGroup;
  employeeId: any;
  employee: any;
  structures: any[] = [];
  roles: any[] = [];
  message: string | null = null;

  constructor(
    private personRestControllerService: PersonRestControllerService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private routeActived: ActivatedRoute,
    private roleRestControllerService: RoleRestControllerService,
    private structureRestControllerService: StructureRestControllerService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.getRoles();
    this.getStructures();
    this.initForm();
    this.getIdEmployee();
    this.getEmployee();
  }

  // Soumettre le formulaire pour modifier l'employé
  onSubmit(): void {
    if (this.employeeForm.valid) {
      const employeeData = this.employeeForm.value;
      console.log(employeeData);
      this.personRestControllerService.updateEmploye(employeeData).subscribe(
        (response: any) => {
          if (response.success) {
            this.toast.success(
              response.message || 'Votre demande a été traité avec success.'
            );
            setTimeout(() => {
              this.employeeForm.reset();
              this.router.navigate(['../../', ROUTES_ADMIN.EMPLOYEE_LIST], {
                relativeTo: this.route,
              });
            }, 2000);
          } else {
            this.toast.error(response.message || 'Une erreur s’est produite.');
          }
        },
        (error) => {
          this.toast.error('Une erreur s’est produite.');
        }
      );
    }
  }

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

  // Initialiser le formulaire avec les données de l'employé
  initForm(): void {
    this.employeeForm = this.fb.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dateBirth: ['', Validators.required],
      mobile: ['', Validators.required],
      typeContratct: ['', Validators.required],
      dateBeginContract: ['', Validators.required],
      dateEndContract: ['', Validators.required],
      structureId: ['', Validators.required],
      roleId: ['', Validators.required],
      compteId: ['', Validators.required],
    });
  }
  // Récupérer l'id de l'employé à modifier
  getIdEmployee(): void {
    this.routeActived.paramMap.subscribe((params) => {
      this.employeeId = +params.get('id')!; // Récupère l'ID en tant que nombre
    });
  }

  // Récupérer les données de l'employé à modifier
  getEmployee(): void {
    this.personRestControllerService.getEmploye(this.employeeId).subscribe(
      (response: any) => {
        if (response.success) {
          this.employee = response.data;
          this.employeeForm.patchValue(this.employee);
        }
      },
      (error: Error) => {
          this.toast.error('Une erreur s’est produite.');
      }
    );
  }

}
