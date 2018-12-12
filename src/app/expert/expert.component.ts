import { Component, OnInit } from '@angular/core';
import { Requirement } from '../models/Requirement';
import { RequirementService } from '../services/requirement/requirement.service';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { EstimationService } from '../services/estimation/estimation.service';
import { Estimation } from '../models/Estimation';

@Component({
  selector: 'app-expert',
  templateUrl: './expert.component.html',
  styleUrls: ['./expert.component.css']
})
export class ExpertComponent implements OnInit {

  requirements: Requirement[];
  estimation: string;
  signedUserId: string;

  constructor(
    private requirementService: RequirementService,
    private router: Router,
    private estimationService: EstimationService,
    private route: ActivatedRoute) {

     }

  ngOnInit() {
    this.getAllRequirements();
    this.signedUserId = this.route.snapshot.paramMap.get('id');
  }

  getAllRequirements() {
    this.requirementService.getAllRequirements().subscribe((result: { status: number, message: string, result: Requirement[] }) => {
      this.requirements = result.result;
    });
  }

  goToRequirementDetails(requirement: Requirement) {
    this.router.navigate(['/requirement-details', { requirement: JSON.stringify(requirement) }]);
  }

  addEstimationToRequirement(idRequirement: number) {
    let estimation: Estimation = {
      idEstimation: null,
      idUser: parseInt(this.signedUserId),
      idRequirement: idRequirement,
      estimation: parseInt(this.estimation)
    }
    this.estimationService.addEstimation(estimation).subscribe();
  }

}
