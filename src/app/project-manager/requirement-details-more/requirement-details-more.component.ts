import { Component, OnInit } from '@angular/core';
import { Requirement } from 'src/app/models/Requirement';
import { Estimation } from 'src/app/models/Estimation';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project/project.service';
import { RequirementService } from 'src/app/services/requirement/requirement.service';
import * as Chart from 'chart.js'

@Component({
  selector: 'app-requirement-details-more',
  templateUrl: './requirement-details-more.component.html',
  styleUrls: ['./requirement-details-more.component.css']
})
export class RequirementDetailsMoreComponent implements OnInit {

  idRequirement: string;
  requirement: Requirement = {
    idRequirement: null,
    name: null,
    description: null,
    author: null,
    creationDate: null,
    finalCost: null
  };
  requirementEstimations: Estimation[] = [];
  canvas: any;
  ctx: any;

  constructor(
    private route: ActivatedRoute,
    private requirementService: RequirementService,
    private router: Router
  ) { }

  ngAfterViewInit() {

    this.idRequirement = this.route.snapshot.paramMap.get('idRequirement');
    this.requirementService.getRequirement(this.idRequirement).subscribe((result: { status: number, message: string, result: Requirement }) => { this.requirement = result.result; console.log("requirement", this.requirement) });
    this.requirementService.getRequirementEstimations(this.idRequirement).subscribe((result: { status: number, message: string, result: Estimation[] }) => {
      this.requirementEstimations = result.result;
      console.log("estimations", this.requirementEstimations);

      if (this.requirementEstimations[0] != undefined) {
        this.canvas = document.getElementById('requirementsChartCanvas');
        this.ctx = this.canvas.getContext('2d');

        let requirementsChart = new Chart(this.ctx, {
          type: 'bar',
          data: {
            labels: ["e1", "e2", "e3"],
            datasets: [{
              label: 'requirements chart',
              data: [
                this.requirementEstimations[0].estimation,
                this.requirementEstimations[1].estimation,
                this.requirementEstimations[2].estimation
              ],
              backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            responsive: false
          }
        });
      }


    });
  }

  ngOnInit() {
  }


  back() {
    this.router.navigate(["/project_manager"]);
  }
}
