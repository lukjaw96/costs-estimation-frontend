import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminStartPage } from './admin/admin-start-page.component';
import { AppComponent } from './app.component';
import { Login } from './login/login.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: '',
    component: Login
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'admin',
    component: AdminStartPage
  },
  {
    path: 'user',
    component: UserComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
