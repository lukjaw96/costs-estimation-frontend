import { Component, OnInit, Input } from '@angular/core';
import { Requirement } from 'src/app/models/Requirement';
import { RequirementService } from 'src/app/services/requirement/requirement.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-requirement',
  templateUrl: './add-requirement.component.html',
  styleUrls: ['./add-requirement.component.css']
})
export class AddRequirementComponent implements OnInit {


  @Input() modal;

  newRequirement: Requirement = {
    idRequirement: null,
    name: null,
    description: null,
    author: null,
    creationDate: null,
    finalCost: null
  }

  constructor(
    private requirementService: RequirementService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
  }

  addRequirement(newRequirement: Requirement) {
    this.requirementService.addRequirement(newRequirement).subscribe(() => this.requirementService.getAllRequirements().subscribe());
    this.modalService.dismissAll();
  }

}


