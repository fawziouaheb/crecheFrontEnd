import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppHeadMonEspaceComponent } from './app-head-mon-espace.component';

describe('AppHeadMonEspaceComponent', () => {
  let component: AppHeadMonEspaceComponent;
  let fixture: ComponentFixture<AppHeadMonEspaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppHeadMonEspaceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppHeadMonEspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
