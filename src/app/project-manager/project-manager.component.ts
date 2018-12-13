import { Component, OnInit } from '@angular/core';
import { Project } from '../models/Project';
import { UserService } from '../services/user/user.service';
import { ProjectService } from '../services/project/project.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Requirement } from '../models/Requirement';
import { RequirementService } from '../services/requirement/requirement.service';

@Component({
  selector: 'app-project-manager',
  templateUrl: './project-manager.component.html',
  styleUrls: ['./project-manager.component.css']
})
export class ProjectManagerComponent implements OnInit {

  projects: Project[] = [];
  requirements: Requirement[] = [];
  closeResult: string;

  constructor(
    private projectService: ProjectService,
    private requirementService: RequirementService,
    private modalService: NgbModal,
    private router: Router
  ) { }

  ngOnInit() {
    this.getAllProjects();
    this.requirementService.getAllRequirements().subscribe((result: { status: number, message: string, result: Requirement[] }) => {
      this.requirements = result.result;
      console.log(this.requirements);
    })
  }

  getAllProjects() {
    this.projectService.getAllProjects().subscribe((result: { status: number, message: string, result: Project[] }) => {
      this.projects = result.result;
    });
  }

  goToProjectDetails(project: Project) {
    this.router.navigate(['project-details-more', { idProject: project.idProject }]);
  }

  goToRequirementDetails(requirement: Requirement) {
    this.router.navigate(['requirement-details-more', { idRequirement: requirement.idRequirement }]);
  }

  openAddProject(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
