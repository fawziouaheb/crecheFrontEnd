import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentsMenuWeekComponent } from './parents-menu-week.component';

describe('ParentsMenuWeekComponent', () => {
  let component: ParentsMenuWeekComponent;
  let fixture: ComponentFixture<ParentsMenuWeekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParentsMenuWeekComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParentsMenuWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
