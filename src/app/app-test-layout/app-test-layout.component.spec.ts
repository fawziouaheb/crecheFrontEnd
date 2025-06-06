import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppTestLayoutComponent } from './app-test-layout.component';

describe('AppTestLayoutComponent', () => {
  let component: AppTestLayoutComponent;
  let fixture: ComponentFixture<AppTestLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppTestLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppTestLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
