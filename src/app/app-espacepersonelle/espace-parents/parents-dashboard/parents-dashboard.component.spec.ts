import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentsDashboardComponent } from './parents-dashboard.component';

describe('ParentsDashboardComponent', () => {
  let component: ParentsDashboardComponent;
  let fixture: ComponentFixture<ParentsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParentsDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParentsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
