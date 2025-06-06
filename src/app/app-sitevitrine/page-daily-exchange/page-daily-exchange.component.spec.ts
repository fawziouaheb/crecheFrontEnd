import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageDailyExchangeComponent } from './page-daily-exchange.component';

describe('PageDailyExchangeComponent', () => {
  let component: PageDailyExchangeComponent;
  let fixture: ComponentFixture<PageDailyExchangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageDailyExchangeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageDailyExchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
