import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppHeadMenuComponent } from './app-head-menu.component';

describe('AppHeadMenuComponent', () => {
  let component: AppHeadMenuComponent;
  let fixture: ComponentFixture<AppHeadMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppHeadMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppHeadMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
