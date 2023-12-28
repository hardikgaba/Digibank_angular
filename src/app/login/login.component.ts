import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;
  
  constructor(
    private loginService: LoginService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onsubmit(): void {
    this.submitted = true;
    console.log('Form submitted:', this.submitted);
    if (this.loginForm.valid) {
      this.loginService.authenticate(this.loginForm.value.username, this.loginForm.value.password).subscribe(
        isAuthenticated => {
          if (isAuthenticated) {
            this.router.navigate(['/account-summary']);
          } else {
            // this._snackBar.open('Invalid credentials', 'Dismiss');
            this.loginForm.get('password')!.setErrors({ invalidCredentials: true });
          }
        },
        error => {
          console.error('Error during authentication', error);
        }
      );
    } else {
      // Move this part inside the if block
      // this._snackBar.open('Please fill in all required fields', 'Dismiss');
      // console.log('error');
      
    }
  }
}
