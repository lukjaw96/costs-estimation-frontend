import { Component, OnInit, Input } from '@angular/core';
import { Requirement } from 'src/app/models/Requirement';
import { RequirementService } from 'src/app/services/requirement/requirement.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectService } from 'src/app/services/project/project.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-requirement-project',
  templateUrl: './add-requirement-project.component.html',
  styleUrls: ['./add-requirement-project.component.css']
})
export class AddRequirementProjectComponent implements OnInit {

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
  profileForm: FormGroup;
  selectedRequirement: string;

  constructor(
    private requirementService: RequirementService,
    private projectService: ProjectService,
    private modalService: NgbModal,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.profileForm = new FormGroup({
      requirement: new FormControl('')
    });

    this.getAllRequirements();
  }

  getAllRequirements() {
    this.requirementService.getAllRequirements().subscribe((result: { status: number, message: string, result: Requirement[] }) => {
      this.requirements = result.result;
    });
  }

  addRequirementToProject() {
    if(this.profileForm.value.requirement == "") {
      this.selectedRequirement = this.requirements[0].name;
    } else {
      this.selectedRequirement = this.profileForm.value.requirement;
    }  
    let newRequirement = this.requirements.find((element) => element.name==this.selectedRequirement);
    let idRequirement = newRequirement.idRequirement;
    this.projectService.addRequirementToProject(this.idProject, idRequirement.toString()).subscribe();
    this.modalService.dismissAll();
  }
}
