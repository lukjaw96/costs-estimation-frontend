import { Component, OnInit } from '@angular/core';
import { Project } from '../models/Project';
import { UserService } from '../services/user/user.service';
import { ProjectService } from '../services/project/project.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Requirement } from '../models/Requirement';
import { RequirementService } from '../services/requirement/requirement.service';
import { Estimation } from '../models/Estimation';
import * as Chart from 'chart.js'

@Component({
  selector: 'app-project-manager',
  templateUrl: './project-manager.component.html',
  styleUrls: ['./project-manager.component.css']
})
export class ProjectManagerComponent implements OnInit {

  projects: Project[] = [];
  requirements: Requirement[] = [];
  closeResult: string;
  requirementsParams: { minimum: number, maximum: number, idReq: number, average: number }[] = [];


  requirementEstimations: Estimation[] = [];
  canvas: any;
  ctx: any;

  constructor(
    private projectService: ProjectService,
    private requirementService: RequirementService,
    private modalService: NgbModal,
    private router: Router
  ) { }

  ngAfterViewInit() {
    this.requirementService.getRequirementsParams().subscribe((result: { status: number, message: string, result: { minimum: number, maximum: number, idReq: number, average: number }[] }) => {
      this.requirementsParams = result.result;

      let labels: string[] = [];
      let minimums: number[] = [];
      let maximums: number[] = [];
      let averages: number[] = [];
      let minimumsBackgroundColor: string[] = [];
      let maksimumsBackgroundColor: string[] = [];
      let averagesBackgroundColor: string[] = [];

      result.result.forEach(element => {
        labels.push("req" + element.idReq.toString());
        minimums.push(element.minimum);
        maximums.push(element.maximum);
        averages.push(element.average);

        minimumsBackgroundColor.push('rgba(0, 173, 171, 1)');
        maksimumsBackgroundColor.push('rgba(248, 181, 0, 1)');
        averagesBackgroundColor.push('rgba(252, 60, 60, 1)');

      });

      if (labels != []) {
        this.canvas = document.getElementById('requirementsChartCanvas');
        this.ctx = this.canvas.getContext('2d');

        let requirementsChart = new Chart(this.ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: 'minimums',
              data: minimums,
              backgroundColor: minimumsBackgroundColor,
              borderWidth: 1
            },
            {
              label: 'maximums',
              data: maximums,
              backgroundColor: maksimumsBackgroundColor,
              borderWidth: 1
            },
            {
              label: 'averages',
              data: averages,
              backgroundColor: averagesBackgroundColor,
              borderWidth: 1
            }
            ]
          },
          options: {
            responsive: false
          }
        });
      }
    })
  }

  ngOnInit() {
    this.getAllProjects();
    this.requirementService.getAllRequirements().subscribe((result: { status: number, message: string, result: Requirement[] }) => {
      this.requirements = result.result;
    })
    this.requirementService.getRequirementsParams().subscribe((result: { status: number, message: string, result: { minimum: number, maximum: number, idReq: number, average: number }[] }) => {
      this.requirementsParams = result.result;
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
