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
import { EstimationService } from '../services/estimation/estimation.service';

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
  estimationsRanges: { idUser: number, range1_3: number, range4_6: number, range7_9: number, range10_12: number }[] = [];
  canvas: any;
  ctx: any;

  constructor(
    private projectService: ProjectService,
    private estimationService: EstimationService,
    private requirementService: RequirementService,
    private modalService: NgbModal,
    private router: Router
  ) { }

  ngAfterViewInit() {
    this.getRequirementsParams();
    this.getEstimationsRanges();
    
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

  getRequirementsParams() {
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
            responsive: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }

        });
      }
    })
  }

  canvasEstimation: any;
  ctxEstimation: any;

  getEstimationsRanges() {
    this.estimationService.getEstimationsRanges().subscribe((result: { status: number, message: string, result: { idUser: number, range1_3: number, range4_6: number, range7_9: number, range10_12: number }[] }) => {
      this.estimationsRanges = result.result;

      let labels: string[] = [];
      let range1_3: number[] = [];
      let range4_6: number[] = [];
      let range7_9: number[] = [];
      let range10_12: number[] = [];
      let range1_3BackgroundColor: string[] = [];
      let range4_6BackgroundColor: string[] = [];
      let range7_9BackgroundColor: string[] = [];
      let range10_12BackgroundColor: string[] = [];

      result.result.forEach(element => {
        labels.push("expert" + element.idUser.toString());
        range1_3.push(element.range1_3);
        range4_6.push(element.range4_6);
        range7_9.push(element.range7_9);
        range10_12.push(element.range10_12);

        range1_3BackgroundColor.push('rgba(0, 173, 171, 1)');
        range4_6BackgroundColor.push('rgba(248, 181, 0, 1)');
        range7_9BackgroundColor.push('rgba(252, 60, 60, 1)');
        range10_12BackgroundColor.push('rgba(57, 62, 70, 1)');

      });

      if (labels != []) {
        this.canvasEstimation = document.getElementById('estimationsChartCanvas');
        this.ctxEstimation = this.canvasEstimation.getContext('2d');

        let estimationsChart = new Chart(this.ctxEstimation, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: 'range1_3',
              data: range1_3,
              backgroundColor: range1_3BackgroundColor,
              borderWidth: 1
            },
            {
              label: 'range4_6',
              data: range4_6,
              backgroundColor: range4_6BackgroundColor,
              borderWidth: 1
            },
            {
              label: 'range7_9',
              data: range7_9,
              backgroundColor: range7_9BackgroundColor,
              borderWidth: 1
            },
            {
              label: 'range10_12',
              data: range10_12,
              backgroundColor: range10_12BackgroundColor,
              borderWidth: 1
            }
            ]
          },
          options: {
            responsive: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
        });
      }
    })
  }

}
