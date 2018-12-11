import { Component, OnInit, Input } from '@angular/core';
import { Requirement } from 'src/app/models/Requirement';
import { RequirementService } from 'src/app/services/requirement/requirement.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectService } from 'src/app/services/project/project.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-requirement-project',
  templateUrl: './add-requirement-project.component.html',
  styleUrls: ['./add-requirement-project.component.css']
})
export class AddRequirementProjectComponent implements OnInit {

  selectedOption: string;
  @Input() idProject: string;

  @Input() modal;

  newRequirement: Requirement = {
    idRequirement: null,
    name: null,
    description: null,
    author: null,
    creationDate: null,
    finalCost: null
  }

  requirements: Requirement[];

  constructor(
    private requirementService: RequirementService,
    private projectService: ProjectService,
    private modalService: NgbModal,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getAllRequirements();
  }

  addRequirement(selectedRequirement: String) {
    let newRequirement = this.requirements.find((element) => element.name==selectedRequirement);
    this.requirementService.addRequirement(newRequirement).subscribe(() => this.requirementService.getAllRequirements().subscribe());
    this.modalService.dismissAll();
  }

  getAllRequirements() {
    this.requirementService.getAllRequirements().subscribe((result: { status: number, message: string, result: Requirement[] }) => {
      this.requirements = result.result;
    });
  }

  addRequirementToProject(selectedRequirement: String) {
    let newRequirement = this.requirements.find((element) => element.name==selectedRequirement);
    let idRequirement = newRequirement.idRequirement;
    this.projectService.addRequirementToProject(this.idProject, idRequirement.toString()).subscribe();
    this.modalService.dismissAll();
  }
}
