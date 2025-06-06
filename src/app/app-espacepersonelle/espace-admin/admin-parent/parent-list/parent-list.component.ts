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
  selector: 'app-parent-list',
  templateUrl: './parent-list.component.html',
  styleUrls: ['./parent-list.component.css'],
})
export class ParentListComponent implements OnInit, OnDestroy {
  public structure$ = this.store.select(selectSelectedStructure);
  parents: any[] = [];
  filteredParents: any[] = [];
  searchTerm: string = '';

  private subscription: Subscription = new Subscription();

  constructor(
    private personRestControllerService: PersonRestControllerService,
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToastrService,
    private store: Store
  ) {}

  ngOnInit(): void {
    const sub = this.structure$
      .pipe(
        filter((s): s is { structureName: string } => !!s?.structureName),
        switchMap((structure) =>
          this.personRestControllerService.getAllParentsByStructure(structure.structureName).pipe(
            catchError((err) => {
              console.error('Erreur lors de la récupération des parents', err);
              this.toast.error('Erreur lors de la récupération des parents.');
              return EMPTY;
            })
          )
        )
      )
      .subscribe((parents: any[]) => {
        this.parents = parents;
        this.filteredParents = [...parents];
      });

    this.subscription.add(sub);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  filterParents(): void {
    if (!this.searchTerm) {
      this.filteredParents = this.parents;
      return;
    }

    const search = this.searchTerm.toLowerCase();

    this.filteredParents = this.parents.filter((parent) => {
      const fullName = `${parent.firstName} ${parent.lastName}`.toLowerCase();
      const email = parent.email?.toLowerCase() ?? '';
      const phone = parent.mobile?.toLowerCase() ?? '';
      const address = parent.address?.toLowerCase() ?? '';

      const parentMatch =
        fullName.includes(search) ||
        email.includes(search) ||
        phone.includes(search) ||
        address.includes(search);

      const childrenMatch = parent.children?.some(
        (child: { firstName?: string; lastName?: string }) => {
          const childFullName = `${child.firstName ?? ''} ${child.lastName ?? ''}`.toLowerCase();
          return childFullName.includes(search);
        }
      ) ?? false;

      return parentMatch || childrenMatch;
    });
  }

  addParent(): void {
    this.router.navigate(['../', ROUTES_ADMIN.PARENTS_ADMIN], {
      relativeTo: this.route,
    });
  }

  editParent(id: number): void {
    this.toast.error("La fonctionnalité n'est pas encore implémentée.");
  }

  deleteParent(id: number): void {
    this.toast.error("La fonctionnalité n'est pas encore implémentée.");
  }

  viewParentDetails(id: number): void {
    const url = ROUTES_ADMIN.PARENT_DETAILS.replace(':id', id.toString());
    this.router.navigate([`../${url}`], { relativeTo: this.route });
  }
}
