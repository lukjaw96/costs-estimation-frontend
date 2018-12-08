import { Component, OnInit, Input } from '@angular/core';
import { Project } from 'src/app/models/Project';
import { ProjectService } from 'src/app/services/project/project.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  @Input() modal;

  newProject: Project = {
    idProject: null,
    name: null,
    description: null,
    author: null,
    status: null,
    startDate: null,
    endDate: null,
  }

  constructor(
    private projectService: ProjectService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
  }

  addProject(newProject: Project) {
    this.projectService.addProject(newProject).subscribe(() => this.projectService.getAllProjects().subscribe());
    this.modalService.dismissAll();
  }

}

