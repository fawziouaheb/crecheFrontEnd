import { Component, OnInit } from '@angular/core';
import { MenuRestControllerService } from '../../../api-client';
import { ROUTES_ADMIN, ROUTES_PARENTS } from '../../../constant/router-constant/router-constant';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, EMPTY } from 'rxjs';
import { filter, switchMap, catchError, take } from 'rxjs/operators';
import { selectCurrentUser } from '../../../store/authentification/auth.selector';
@Component({
  selector: 'app-parents-dashboard',
  templateUrl: './parents-dashboard.component.html',
  styleUrls: ['./parents-dashboard.component.css']
})
export class ParentsDashboardComponent implements OnInit {

  selectedImage : string | null = null;
  menu: any = null;
  error: string | null = null;
  private subscription: Subscription = new Subscription();
  constructor(private menuRestControllerService: MenuRestControllerService,
              private router: Router,
              private route: ActivatedRoute,
              private store: Store
  ) {}

  ngOnInit(): void {
    this.menuRestControllerService.getLastMenu().subscribe({
          next: (response: any) => {
            if (response.success) {
              this.menu = response.data;
              console.log('Menu récupéré avec succès', response);
            } else {
              this.error = 'Aucun menu trouvé';
            }
          },
          error: (err) => {
            this.error = 'Erreur lors de la récupération des menus';
            console.error('Erreur lors de la récupération des menus', err);
          }
        });
  }

  openImageModal(menu: any) {
  this.selectedImage = 'data:image/jpeg;base64,' + menu.image;
  const modal = new bootstrap.Modal(document.getElementById('imageModal')!);
  modal.show();
  }

viewMyRepository(): void {
  console.log('Méthode viewMyRepository() appelée'); // Vérifie que la méthode est appelée

  const sub = this.store
    .select(selectCurrentUser)
    .pipe(
      take(1)
    )
    .subscribe((user) => {
      if (user && user.id) {
        const url = ROUTES_PARENTS.PARENT_DETAILS.replace(':id', user.id.toString());
        this.router.navigate([`../${url}`], { relativeTo: this.route });
      } else {
        console.error('Aucun user ou id trouvé dans le store !');
      }
    });

  this.subscription.add(sub);
}




}
