import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/models/Project';
import { ProjectService } from 'src/app/services/project/project.service';
import { Requirement } from 'src/app/models/Requirement';

@Component({
  selector: 'app-project-details-more',
  templateUrl: './project-details-more.component.html',
  styleUrls: ['./project-details-more.component.css']
})
export class ProjectDetailsMoreComponent implements OnInit {

  idProject: string;
  project: Project = {
    idProject: null,
    name: null,
    description: null,
    author: null,
    status: null,
    startDate: null,
    endDate: null,
  };
  projectRequirements: Requirement[] = [];
  signedUserId: string;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private router: Router
  ) { }

  ngOnInit() {
    this.idProject = this.route.snapshot.paramMap.get('idProject');
    this.projectService.getProject(this.idProject).subscribe((result: { status: number, message: string, result: Project }) => this.project = result.result);
    this.projectService.getProjectRequirements(this.idProject).subscribe((result: { status: number, message: string, result: Requirement[] }) => {this.projectRequirements = result.result});
    this.signedUserId = this.route.snapshot.paramMap.get('id');
  }

  back() {
    this.router.navigate(["/project_manager", {id: this.signedUserId}]);
  }
}
