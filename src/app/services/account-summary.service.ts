import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountSummaryService {
 
  private accountsUrl="http://localhost:3000/accounts";
    
  constructor(private http:HttpClient) { }
  getAccountssummary():Observable<any[]> {
    return this.http.get<any[]>(this.accountsUrl);
  }
}
