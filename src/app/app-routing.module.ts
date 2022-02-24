import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {LogoutComponent} from "./logout/logout.component";
import {AuthGaurdService} from "./service/auth-gaurd.service";
import {TicketManagementComponent} from "./ticket-management/ticket-management.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'ticket-management', component: TicketManagementComponent},
  {path: 'logout', component: LogoutComponent, canActivate: [AuthGaurdService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
