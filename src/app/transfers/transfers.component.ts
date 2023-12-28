import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TransferService } from '../services/transfer-services.service';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { ConfigurationService } from '../services/configuration.service';
@Component({
  selector: 'app-transfers',
  templateUrl: './transfers.component.html',
  styleUrl: './transfers.component.css',
  providers: [DatePipe],
})
export class TransfersComponent {
  toAccountNumber: string = '';
  amount: number = 0;
  errorMessage: string = '';

  constructor(
    private transferService: TransferService,
    private router: Router,
    private datePipe: DatePipe,
    private _snackBar: MatSnackBar,
    private configService: ConfigurationService
  ) {}

  transferMoney(): void {
    const currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd') ?? '';
    // Clear previous error message
    this.errorMessage = '';

    // Ensure the 'toAccountNumber' and 'amount' are provided
    if (this.toAccountNumber && this.amount > 0) {
      // Fetch the selected account from sessionStorage
      const selectedAccount = JSON.parse(
        sessionStorage.getItem('selectedAccount') || '{}'
      );
      console.log('Selected Account:', selectedAccount);

      const currentusername = JSON.parse(
        sessionStorage.getItem('currentUser') || '{}'
      );

      // Call the transfer service to perform the transfer
      this.transferService
        .transferMoney(
          selectedAccount.id,
          this.toAccountNumber,
          this.amount,
          currentDate,
          currentusername.username
        )
        .subscribe({
          next: (result) => {
            console.log('Transfer Result:', result);

            // Handle success, e.g., show a success message
            if (result && result.balance) {
              // this._snackBar.open('Transfer successful! Updated balance: ' + result.balance);
              const currencyCode = this.configService.getCurrencyCode();
              const currencySymbols: { [key: string]: string } = {
                INR: '₹',
                USD: '$',
                EUR: '€',
                // Add more currency symbols as needed
              };
              const symbol = currencySymbols[currencyCode] || currencyCode;
              const formatted = `${symbol} ${result.balance.toFixed(2)}`;
              Swal.fire({
                title: 'Transfer Successful',
                text: ' Updated balance ' + formatted,
                icon: 'success',
              });
              // Redirect to account summary page
              const url = '/account-details/' + selectedAccount.id;
              this.router.navigate([url]);
            } else {
              // Handle unexpected response
              this.errorMessage = 'Unexpected response during transfer.';
            }
          },
          error: (error) => {
            Swal.fire({
              title: 'Transfer UnSuccessful',
              text: error,
              icon: 'error',
            });
            console.error('Transfer Error:', error);

            // Handle error, e.g., display an error message
            this.errorMessage = 'Error during transfer.';
          },
        });
    } else {
      // Handle invalid input, e.g., display an error message
      this.errorMessage =
        'Invalid input. Please provide valid values for "To Account" and "Amount".';
    }
  }
}
