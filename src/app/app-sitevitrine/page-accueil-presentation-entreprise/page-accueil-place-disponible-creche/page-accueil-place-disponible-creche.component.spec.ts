import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAccueilPlaceDisponibleCrecheComponent } from './page-accueil-place-disponible-creche.component';

describe('PageAccueilPlaceDisponibleCrecheComponent', () => {
  let component: PageAccueilPlaceDisponibleCrecheComponent;
  let fixture: ComponentFixture<PageAccueilPlaceDisponibleCrecheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageAccueilPlaceDisponibleCrecheComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageAccueilPlaceDisponibleCrecheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
