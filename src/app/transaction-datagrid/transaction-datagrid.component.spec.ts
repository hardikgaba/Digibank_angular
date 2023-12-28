import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionDatagridComponent } from './transaction-datagrid.component';

describe('TransactionDatagridComponent', () => {
  let component: TransactionDatagridComponent;
  let fixture: ComponentFixture<TransactionDatagridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionDatagridComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransactionDatagridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
