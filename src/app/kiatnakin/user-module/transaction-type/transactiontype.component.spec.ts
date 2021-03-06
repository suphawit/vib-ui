import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactiontypeComponent } from './transactiontype.component';

describe('TransactiontypeComponent', () => {
  let component: TransactiontypeComponent;
  let fixture: ComponentFixture<TransactiontypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactiontypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactiontypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
