import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from './services/user/user.service';
import { LoginService } from './services/login/login.service';
import { AddUserComponent } from './admin/add-user/add-user.component';
import { UpdateUserComponent } from './admin/update-user/update-user.component';
import { UpdatePasswordComponent } from './admin/update-password/update-password.component';
import { UpdateSelfComponent } from './admin/update-self/update-self.component';
import { ProjectManagerComponent } from './project-manager/project-manager.component';
import { SettingsBarComponent } from './settings-bar/settings-bar.component';
import { ProjectService } from './services/project/project.service';
import { AddProjectComponent } from './project-manager/add-project/add-project.component';
import { AnalystComponent } from './analyst/analyst.component';
import { ProjectRequirementsComponent } from './analyst/project-requirements/project-requirements.component';
import { RequirementService } from './services/requirement/requirement.service';
import { AddRequirementComponent } from './analyst/project-requirements/add-requirement/add-requirement.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    AddUserComponent,
    UpdateUserComponent,
    UpdatePasswordComponent,
    UpdateSelfComponent,
    ProjectManagerComponent,
    SettingsBarComponent,
    AddProjectComponent,
    AnalystComponent,
    ProjectRequirementsComponent,
    AddRequirementComponent
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
    ProjectService,
    RequirementService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

