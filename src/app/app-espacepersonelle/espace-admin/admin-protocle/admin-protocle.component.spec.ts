import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProtocleComponent } from './admin-protocle.component';

describe('AdminProtocleComponent', () => {
  let component: AdminProtocleComponent;
  let fixture: ComponentFixture<AdminProtocleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminProtocleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminProtocleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
