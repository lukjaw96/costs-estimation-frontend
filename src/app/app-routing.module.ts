import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { ProjectManagerComponent } from './project-manager/project-manager.component';
import { AnalystComponent } from './analyst/analyst.component';
import { ProjectRequirementsComponent } from './analyst/project-requirements/project-requirements.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'project_manager',
    component: ProjectManagerComponent
  },
  {
    path: 'analyst',
    component: AnalystComponent
  },
  {
    path: 'project-requirements',
    component: ProjectRequirementsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
