import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { AccountSummaryComponent } from './account-summary/account-summary.component';
import { TransfersComponent } from './transfers/transfers.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'account-summary',component:AccountSummaryComponent,canActivate: [AuthGuard]},
  {path:'account-details',component:AccountDetailsComponent,canActivate: [AuthGuard]},
  {path:'account-details/:id',component:AccountDetailsComponent,canActivate: [AuthGuard]},
  {path:'transfer' ,component:TransfersComponent,canActivate: [AuthGuard]},
  {path: '', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
