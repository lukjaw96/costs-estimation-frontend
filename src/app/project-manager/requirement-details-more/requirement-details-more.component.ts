import { Component, OnInit } from '@angular/core';
import { Requirement } from 'src/app/models/Requirement';
import { Estimation } from 'src/app/models/Estimation';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project/project.service';
import { RequirementService } from 'src/app/services/requirement/requirement.service';

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

  constructor(
    private route: ActivatedRoute,
    private requirementService: RequirementService
  ) { }

  ngOnInit() {
    this.idRequirement = this.route.snapshot.paramMap.get('idRequirement');
    this.requirementService.getRequirement(this.idRequirement).subscribe((result: { status: number, message: string, result: Requirement }) => {this.requirement = result.result; console.log("requirement", this.requirement)});
    this.requirementService.getRequirementEstimations(this.idRequirement).subscribe((result: { status: number, message: string, result: Estimation[] }) => {this.requirementEstimations = result.result; console.log("estimations", this.requirementEstimations);});
  }
}
