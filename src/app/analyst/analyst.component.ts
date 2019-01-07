import { Component, OnInit } from '@angular/core';
import { Project } from '../models/Project';
import { ProjectService } from '../services/project/project.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { Requirement } from '../models/Requirement';
import { RequirementService } from '../services/requirement/requirement.service';

@Component({
  selector: 'app-analyst',
  templateUrl: './analyst.component.html',
  styleUrls: ['./analyst.component.css']
})
export class AnalystComponent implements OnInit {

  projects: Project[] = [];
  requirements: Requirement[] = [];
  closeResult: string;
  signedUserId: string;

  constructor(
    private requirementService: RequirementService, 
    private projectService: ProjectService,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getAllProjects();
    this.getAllRequirements();
    this.signedUserId = this.route.snapshot.paramMap.get('id');
  }

  getAllProjects() {
    this.projectService.getAllProjects().subscribe((result: { status: number, message: string, result: Project[] }) => {
      this.projects = result.result;
    });
  }

  openProjectRequirements(project: Project) {
    this.router.navigate(['project-requirements', { idProject: project.idProject, id: this.signedUserId }]);
  }

  getAllRequirements() {
    this.requirementService.getAllRequirements().subscribe((result: { status: number, message: string, result: Requirement[] }) => {
      this.requirements = result.result;
    });
  }
  
  openAddRequirement(content) {
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
