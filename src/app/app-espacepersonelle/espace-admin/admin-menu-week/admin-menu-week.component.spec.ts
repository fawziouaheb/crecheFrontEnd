import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMenuWeekComponent } from './admin-menu-week.component';

describe('AdminMenuWeekComponent', () => {
  let component: AdminMenuWeekComponent;
  let fixture: ComponentFixture<AdminMenuWeekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminMenuWeekComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminMenuWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
