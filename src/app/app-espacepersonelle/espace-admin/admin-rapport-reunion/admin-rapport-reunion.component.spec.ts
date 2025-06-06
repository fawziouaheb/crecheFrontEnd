import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRapportReunionComponent } from './admin-rapport-reunion.component';

describe('AdminRapportReunionComponent', () => {
  let component: AdminRapportReunionComponent;
  let fixture: ComponentFixture<AdminRapportReunionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminRapportReunionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminRapportReunionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
