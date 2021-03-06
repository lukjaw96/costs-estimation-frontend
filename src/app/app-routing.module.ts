import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { ProjectManagerComponent } from './project-manager/project-manager.component';
import { AnalystComponent } from './analyst/analyst.component';
import { ProjectRequirementsComponent } from './analyst/project-requirements/project-requirements.component';
import { ExpertComponent } from './expert/expert.component';
import { RequirementDetailsComponent } from './requirement/requirement-details/requirement-details.component';
import { ProjectDetailsMoreComponent } from './project-manager/project-details-more/project-details-more.component';
import { RequirementDetailsMoreComponent } from './project-manager/requirement-details-more/requirement-details-more.component';

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
  },
  {
    path: 'expert',
    component: ExpertComponent
  },
  {
    path: 'requirement-details',
    component: RequirementDetailsComponent
  },
  {
    path: 'project-details-more',
    component: ProjectDetailsMoreComponent
  },
  {
    path: 'requirement-details-more',
    component: RequirementDetailsMoreComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
