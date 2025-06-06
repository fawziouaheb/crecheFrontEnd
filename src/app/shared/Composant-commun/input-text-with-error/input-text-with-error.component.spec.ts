import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTextWithErrorComponent } from './input-text-with-error.component';

describe('InputTextWithErrorComponent', () => {
  let component: InputTextWithErrorComponent;
  let fixture: ComponentFixture<InputTextWithErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputTextWithErrorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputTextWithErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
