import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTES_ADMIN } from '../../../../constant/router-constant/router-constant';
import { PersonRestControllerService } from '../../../../api-client';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { selectSelectedStructure } from '../../admin-store/admin.selectors';
import { Subscription, EMPTY } from 'rxjs';
import { filter, switchMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
})
export class EmployeeListComponent implements OnInit, OnDestroy {
  public structure$ = this.store.select(selectSelectedStructure);
  employees: any[] = [];
  private subscription: Subscription = new Subscription();

  constructor(
    private personRestControllerService: PersonRestControllerService,
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToastrService,
    private store: Store
  ) {}

  ngOnInit(): void {
    // À chaque changement de structure, récupérer la liste des employés
    const sub = this.structure$
      .pipe(
        filter((s): s is { structureName: string } => !!s?.structureName),
        switchMap((structure) =>
          this.personRestControllerService
            .getAllByStructure(structure.structureName) // <=== ICI, adapter à ton endpoint
            .pipe(
              catchError((err) => {
                console.error('Erreur lors de la récupération des employés', err);
                this.toast.error('Erreur lors de la récupération des employés.');
                return EMPTY; // éviter de faire planter l'Observable
              })
            )
        )
      )
      .subscribe((employees: any[]) => {
        console.log('Employés récupérés pour la structure :', employees);
        this.employees = employees;
      });

    this.subscription.add(sub);
  }

  ngOnDestroy(): void {
    // Pour éviter les fuites de mémoire
    this.subscription.unsubscribe();
  }

  addEmployee(): void {
    this.router.navigate(['../', ROUTES_ADMIN.EMPLOYEE_ADMIN], {
      relativeTo: this.route,
    });
  }

  editEmployee(id: number): void {
    const url = ROUTES_ADMIN.EMPLOYEE_EDIT.replace(':id', id.toString());
    this.router.navigate([`../${url}`], { relativeTo: this.route });
  }

  deleteEmployee(id: number): void {
    this.toast.error("La fonctionnalité n'est pas encore implémentée.");
  }

  viewEmployeDetails(id: number): void {
    const url = ROUTES_ADMIN.EMPLOYEE_DETAILS.replace(':id', id.toString());
    this.router.navigate([`../${url}`], { relativeTo: this.route });
  }
}
