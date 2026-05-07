import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceCard } from './finance-card';

describe('FinanceCard', () => {
  let component: FinanceCard;
  let fixture: ComponentFixture<FinanceCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinanceCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinanceCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
