import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { CurrentUserDto } from '../../api-client';
import { selectCurrentUser } from '../../store/authentification/auth.selector';
import { loadMenu } from '../espace-personnelle-store/espace-personnelle.actions';
import { selectMenuItems } from '../espace-personnelle-store/espace-personnelle.selectors';
import { AppEspacepersonelleModule } from '../app-espacepersonelle.module';

@Component({
  selector: 'espace-employee',
  templateUrl: './espace-employee.component.html',
})
export class EspaceEmployeeComponent implements OnInit {
  public username$: Observable<string> = this.store
    .select(selectCurrentUser)
    .pipe(map((user: CurrentUserDto | null) => user?.username ?? ''));

  public menuItems$: any;

  constructor(private store: Store) {}

  ngOnInit(): void {
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

    console.log('LOG: ', this.menuItems$);
  }
}
