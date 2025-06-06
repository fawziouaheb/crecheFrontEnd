import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { PreinscriptionStateService } from './admin-preinscription-service/admin-preinscription-state';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTES_ADMIN } from '../../../constant/router-constant/router-constant';
import { PreinscriptionDto } from '../../../api-client/model/preinscriptionDto';
import { PreinscriptionRestControllerService } from '../../../api-client/api/preinscriptionRestController.service';
import { ApiResponseObject } from '../../../api-client';
import { Store } from '@ngrx/store';
import { selectSelectedStructure } from '../admin-store/admin.selectors';
import { Observable, EMPTY } from 'rxjs';
import { switchMap, filter, map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-admin-preinscription',
  templateUrl: './admin-preinscription.component.html',
  styleUrls: ['./admin-preinscription.component.css'],
})
export class AdminPreinscriptionComponent implements OnInit {
  public structure$ = this.store.select(selectSelectedStructure);

  public preinscriptions$: Observable<PreinscriptionDto[]> =
    this.structure$.pipe(
      filter((s): s is { structureName: string } => !!s?.structureName),
      switchMap((structure) =>
        this.preinscriptionService
          .getAllPreinscriptionsByStructure(structure.structureName)
          .pipe(
            map((res) => res.data ?? []),
            catchError((err) => {
              console.error('Erreur de chargement des préinscriptions', err);
              return EMPTY;
            })
          )
      )
    );

  columns: string[] = ['Prénom', 'Nom', 'Email du parent'];
  keys: string[] = ['firstName', 'lastName', 'parents[0].email'];

  constructor(
    private preinscriptionService: PreinscriptionRestControllerService,
    private stateService: PreinscriptionStateService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit(): void {}

  onView(item: PreinscriptionDto) {
    this.stateService.setPreinscription(item);
    this.router.navigate(['../', ROUTES_ADMIN.PREINSCRITION_VISUALISATION], {
      relativeTo: this.route,
    });
  }

  onDelete(item: PreinscriptionDto) {
    this.preinscriptionService.deletePreinscription(item.id!).subscribe({
      next: (response) => {
        if (response.success) {
          this.toast.success(response.message);
          // Pas de reload direct, tu peux utiliser un Subject si tu veux déclencher manuellement
        } else {
          this.toast.error(response.message);
        }
      },
      error: (err) => {
        console.error('Erreur lors de la suppression', err);
      },
    });
  }

  onAccept(item: PreinscriptionDto) {
    this.preinscriptionService.confirmPreinscription(item.id!).subscribe({
      next: (response: ApiResponseObject) => {
        if (response.success) {
          this.toast.success(response.message);
        } else {
          this.toast.error(response.message);
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
