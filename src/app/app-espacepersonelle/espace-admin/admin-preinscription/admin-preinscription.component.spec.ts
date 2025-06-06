import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPreinscriptionComponent } from './admin-preinscription.component';

describe('AdminPreinscriptionComponent', () => {
  let component: AdminPreinscriptionComponent;
  let fixture: ComponentFixture<AdminPreinscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminPreinscriptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminPreinscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
