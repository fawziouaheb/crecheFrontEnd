import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppMessageDisplayComponent } from './app-message-display.component';

describe('AppMessageDisplayComponent', () => {
  let component: AppMessageDisplayComponent;
  let fixture: ComponentFixture<AppMessageDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppMessageDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppMessageDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
