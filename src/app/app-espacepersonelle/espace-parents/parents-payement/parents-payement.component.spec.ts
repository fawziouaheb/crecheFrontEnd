import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentsPayementComponent } from './parents-payement.component';

describe('ParentsPayementComponent', () => {
  let component: ParentsPayementComponent;
  let fixture: ComponentFixture<ParentsPayementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParentsPayementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParentsPayementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
