import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { AccountSummaryComponent } from './account-summary/account-summary.component';
import { TransactionDatagridComponent } from './transaction-datagrid/transaction-datagrid.component';
import { TransfersComponent } from './transfers/transfers.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccountDetailsService } from './services/account-details.service';
import { NavbarComponent } from './navbar/navbar.component';
import{MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './footer/footer.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule} from '@angular/material/sort';
import { environment } from '../environments/environment.development';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { CurrencyPipePipe } from './pipes/currency-pipe.pipe';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AccountDetailsComponent,
    AccountSummaryComponent,
    TransactionDatagridComponent,
    TransfersComponent,
    NavbarComponent,
    FooterComponent,
    CurrencyPipePipe
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    FontAwesomeModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    RecaptchaV3Module,
    MatSnackBarModule,
    MatCardModule,
    ReactiveFormsModule
    
    
  ],
  providers: [
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: environment.recaptcha.siteKey,
    },
    AccountDetailsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
