import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspacePersonnellLayoutComponent } from './espace-personnell-layout.component';

describe('EspacePersonnellLayoutComponent', () => {
  let component: EspacePersonnellLayoutComponent;
  let fixture: ComponentFixture<EspacePersonnellLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EspacePersonnellLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EspacePersonnellLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
