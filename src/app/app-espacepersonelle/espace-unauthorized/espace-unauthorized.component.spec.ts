import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaceUnauthorizedComponent } from './espace-unauthorized.component';

describe('EspaceUnauthorizedComponent', () => {
  let component: EspaceUnauthorizedComponent;
  let fixture: ComponentFixture<EspaceUnauthorizedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EspaceUnauthorizedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EspaceUnauthorizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
