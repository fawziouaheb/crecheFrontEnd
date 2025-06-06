import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVilleComponent } from './admin-ville.component';

describe('AdminVilleComponent', () => {
  let component: AdminVilleComponent;
  let fixture: ComponentFixture<AdminVilleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminVilleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminVilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
