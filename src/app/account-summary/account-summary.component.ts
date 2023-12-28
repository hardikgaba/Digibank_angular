import { Component, OnInit } from '@angular/core';
import { AccountSummaryService } from '../services/account-summary.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-summary',
  templateUrl: './account-summary.component.html',
  styleUrls: ['./account-summary.component.css']
})
export class AccountSummaryComponent implements OnInit {
  accounts: any[] = [];
  userId: string = "";

  constructor(
    private accountSummaryService: AccountSummaryService,
    private router:Router
    ) {}

  toAccDetails(account:any){
    sessionStorage.setItem('selectedAccount', JSON.stringify(account));
    this.router.navigate(['/account-details', account.id]);
  }
  ngOnInit(): void {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
    this.userId = currentUser.id;
    // Fetch account summary data from the service
    this.accountSummaryService.getAccountssummary().subscribe({
      next: data => {
        
        this.accounts = data.filter(account=>account.userId===this.userId);
        
      },
      error: error => {
        console.error('Error fetching account summary', error);
      }
    });
  }
}
