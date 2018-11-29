import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';
import { FormsModule } from '@angular/forms';
import { AdminStartPage } from './admin/admin-start-page.component';
import { Login } from './login/login.component';
import { UserComponent } from './user/user.component';

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
    FormsModule
  ],
  providers: [
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
