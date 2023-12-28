import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private usersUrl = 'http://localhost:3000/users';
  constructor(private http:HttpClient) { }
  getUsers():Observable<any[]>{
    return this.http.get<any[]>(this.usersUrl);
  }
  
  authenticate(username: string, password: string): Observable<boolean> {
    return this.getUsers().pipe(
      map(users => {
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
          // Store user details in session storage or use a token for authentication
          sessionStorage.setItem('currentUser', JSON.stringify(user));
          return true;
        }
        return false;
      })
    );
  }

}

