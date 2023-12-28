import { Component,OnInit,HostListener } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Router } from '@angular/router';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  
})
export class NavbarComponent implements OnInit {
  variable = 'digibank\\src\\assets\\DigiBank-logos.jpeg';
  username:string="";
  ngOnInit(): void {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
    this.username=currentUser.username;
  }
  constructor(private router:Router){}
 
  logout(){
    sessionStorage.clear();
    


    this.router.navigate(['/login']);

  }
  toAccSummary(){
    
    this.router.navigate(['/account-summary']);
  }
checkUser(){
  if (sessionStorage.getItem('currentUser'))
  return true;
else 
return false;
}
  
}
