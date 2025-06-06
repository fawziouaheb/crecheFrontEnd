import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPointageComponent } from './admin-pointage.component';

describe('AdminPointageComponent', () => {
  let component: AdminPointageComponent;
  let fixture: ComponentFixture<AdminPointageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminPointageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminPointageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
