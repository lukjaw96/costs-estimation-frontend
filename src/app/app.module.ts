import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';
import { LoginService } from './services/login.service';
import { FormsModule } from '@angular/forms';
import { AdminStartPage } from './admin/admin-start-page.component';
import { Login } from './login/login.component';
import { UserComponent } from './user/user.component';
import { AdminService } from './services/admin.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    AdminStartPage,
    Login,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgbModule
  ],
  providers: [
    UserService,
    LoginService,
    AdminService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

