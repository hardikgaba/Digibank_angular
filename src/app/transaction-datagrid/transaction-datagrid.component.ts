import { Component ,OnInit, ViewChild} from '@angular/core';
import { AccountDetailsService } from '../services/account-details.service';
import { ActivatedRoute } from '@angular/router';
import{MatPaginator} from '@angular/material/paginator';  
import { MatTableDataSource } from '@angular/material/table';
import {MatSort, Sort, } from '@angular/material/sort';
@Component({
  selector: 'app-transaction-datagrid',
  templateUrl: './transaction-datagrid.component.html',
  styleUrl: './transaction-datagrid.component.css',
})
export class TransactionDatagridComponent {
transactions:any[]=[];
account:any;
displayedColumns: string[] = ['amount','from','to', 'type', 'date'];
  dataSource!:MatTableDataSource <any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

constructor(
  private route:ActivatedRoute,
  private accountDetailsService:AccountDetailsService){}
  
  @ViewChild(MatSort) sort!: MatSort;
 
  ngOnInit():void{
    this.route.params.subscribe(params=>{
      const id = params['id'];

      this.accountDetailsService.getTransactionHistory(id).subscribe({
        next: transactions => {
          this.transactions = transactions;
          this.dataSource= new MatTableDataSource(transactions);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.dataSource.sortingDataAccessor = (item, property) => {
          switch (property) {
            case 'date':
              return new Date(item.date);
            default:
              return item[property];
          }
        };
        this.dataSource.sort.sort({
          id: 'date',
          start: 'desc',
          disableClear: false,
        });
        },
        error: error => {
          console.error('Error fetching transaction history', error);
        }
    });
    this.accountDetailsService.getAccountDetails(id).subscribe({
      next: account => {
        this.account = account;
        // Store the selected account in sessionStorage for later use
        sessionStorage.setItem('selectedAccount', JSON.stringify(account));
      },
      error: error => {
        console.error('Error fetching account details', error);
      }
    }); 
  }); 
  
  
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
