import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCandidateComponent } from './page-candidate.component';

describe('PageCandidateComponent', () => {
  let component: PageCandidateComponent;
  let fixture: ComponentFixture<PageCandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageCandidateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
