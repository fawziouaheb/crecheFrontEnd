import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPreinscriptionVisualisationComponent } from './admin-preinscription-visualisation.component';

describe('AdminPreinscriptionVisualisationComponent', () => {
  let component: AdminPreinscriptionVisualisationComponent;
  let fixture: ComponentFixture<AdminPreinscriptionVisualisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminPreinscriptionVisualisationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminPreinscriptionVisualisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
