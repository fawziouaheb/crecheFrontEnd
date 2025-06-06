import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, catchError, map } from 'rxjs';
import {
  CurrentUserDto,
  StructureDto,
  StructureRestControllerService,
  ApiResponseObject,
} from '../../api-client';
import { ROUTES_ADMIN } from '../../constant/router-constant/router-constant';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '../../store/authentification/auth.selector';
import { loadSelectedStructure } from './admin-store/admin.actions';
import { selectSelectedStructure } from './admin-store/admin.selectors';
import { selectMenuItems } from '../espace-personnelle-store/espace-personnelle.selectors';
import { loadMenu } from '../espace-personnelle-store/espace-personnelle.actions';
@Component({
  selector: 'espace-admin',
  templateUrl: './espace-admin.component.html',
})
export class EspaceAdminComponent implements OnInit {
  public structuresNames$?: Observable<string[]>;
  public structureChoisi: string = '';

  public structure$ = this.store.select(selectSelectedStructure);

  public username$: Observable<string> = this.store
    .select(selectCurrentUser)
    .pipe(map((user: CurrentUserDto | null) => user?.username ?? ''));

  public menuItems$: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private structureControllerService: StructureRestControllerService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.structuresNames$ = this.loadStructureNames();
    this.store.dispatch(loadMenu());
    this.menuItems$ = this.store.select(selectMenuItems).pipe(
      map((items) =>
        items.map((item) => ({
          name: item.name ?? '',
          url: item.url ?? '',
          ordre: item.ordre ?? 0,
          selected: item.ordre == 1,
          hovered: false,
        }))
      )
    );
  }

  onValueChange(value: string): void {
    this.structureChoisi = value;
    this.store.dispatch(loadSelectedStructure({ name: value }));
  }

  navigateToStructure(): void {
    this.router.navigate(['../', ROUTES_ADMIN.STRUCTURE], {
      relativeTo: this.route,
    });
  }

  private loadStructureNames(): Observable<string[]> {
    return this.structureControllerService.getAllStructuresNames().pipe(
      map((result: ApiResponseObject) => {
        return Array.isArray(result.data) ? result.data : [];
      }),
      // Tu peux garder ce catchError ici car c’est un simple chargement au `ngOnInit`
      catchError((error) => {
        console.error('Erreur lors du chargement des noms de structure', error);
        return [];
      })
    );
  }
}
