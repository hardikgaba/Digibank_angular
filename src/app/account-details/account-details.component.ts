import { Component,OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { AccountDetailsService } from '../services/account-details.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrl: './account-details.component.css'
})
export class AccountDetailsComponent  implements OnInit{
  account:any;
  transactions:any[]=[];
 
  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private accountDetailsService: AccountDetailsService
  ) {}

  toTransfer(){
    this.router.navigate(['/transfer']);
  }
   
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
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
    
  }}

