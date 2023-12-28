// transfer.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class TransferService {
  private transactionsUrl = 'http://localhost:3000/transactions';
  private accountsUrl = 'http://localhost:3000/accounts';
  private userNameurl='http://localhost:3000/users'

  constructor(private http: HttpClient) {}

  transferMoney(
    fromAccountId: string,
    toAccountNumber: string,
    amount: number,
    date:string,
    uname:string
  ): Observable<any> {
    
    // Fetch the source account
    return this.http.get<any>(`${this.accountsUrl}/${fromAccountId}`).pipe(
      switchMap((account) => {
        // Check if the source account has sufficient balance
        if (account.balance >= amount) {
          // Initiate the transfer
          const transferData = {
            accountId: fromAccountId,
            to: toAccountNumber,
            amount: amount,
            type: 'Debit',
            date: date,
            from:uname,
          };

          // Perform the transaction
          return this.http.post<any>(this.transactionsUrl, transferData).pipe(
            switchMap(() => {
              // Update the source account balance
              account.balance -= amount;
              return this.http.put<any>(
                `${this.accountsUrl}/${fromAccountId}`,
                account
              );
            })
          );
        } else {
          // Return an error observable if the balance is insufficient
          return new Observable((observer) =>
            observer.error('Insufficient funds.')
            

          );
        }
      })
    );
  }
}
