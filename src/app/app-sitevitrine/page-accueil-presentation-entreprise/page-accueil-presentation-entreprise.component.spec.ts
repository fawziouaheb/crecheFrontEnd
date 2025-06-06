import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAccueilPresentationEntrepriseComponent } from './page-accueil-presentation-entreprise.component';

describe('PageAccueilPresentationEntrepriseComponent', () => {
  let component: PageAccueilPresentationEntrepriseComponent;
  let fixture: ComponentFixture<PageAccueilPresentationEntrepriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageAccueilPresentationEntrepriseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageAccueilPresentationEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
