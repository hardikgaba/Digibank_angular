import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AccountDetailsService {
  private accountsUrl = "http://localhost:3000/accounts";
  private transactionsUrl = "http://localhost:3000/transactions";

  constructor(private http: HttpClient) {}

  getAccountDetails(accountId: string): Observable<any> {
    return this.http.get<any>(`${this.accountsUrl}/${accountId}`);
  }

  getTransactionHistory(accountId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.transactionsUrl}?accountId=${accountId}`);
  }
}

