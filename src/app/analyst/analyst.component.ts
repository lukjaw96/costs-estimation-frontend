import { Component, OnInit } from '@angular/core';
import { Project } from '../models/Project';
import { ProjectService } from '../services/project/project.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-analyst',
  templateUrl: './analyst.component.html',
  styleUrls: ['./analyst.component.css']
})
export class AnalystComponent implements OnInit {

  projects: Project[] = [];
  closeResult: string;

  constructor(
    private projectService: ProjectService,
    private modalService: NgbModal,
    private router: Router
  ) { }

  ngOnInit() {
    this.getAllProjects();
  }

  getAllProjects() {
    this.projectService.getAllProjects().subscribe((result: { status: number, message: string, result: Project[] }) => {
      this.projects = result.result;
    });
  }

  openProjectRequirements(project: Project) {
    this.router.navigate(['project-requirements', { project: project }]);
  }
}




