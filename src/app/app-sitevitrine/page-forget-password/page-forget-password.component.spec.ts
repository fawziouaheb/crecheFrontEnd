import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageForgetPasswordComponent } from './page-forget-password.component';

describe('PageForgetPasswordComponent', () => {
  let component: PageForgetPasswordComponent;
  let fixture: ComponentFixture<PageForgetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageForgetPasswordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageForgetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
