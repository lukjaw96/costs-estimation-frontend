import { Component, OnInit } from '@angular/core';
import { Requirement } from 'src/app/models/Requirement';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { RequirementService } from 'src/app/services/requirement/requirement.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project/project.service';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-project-requirements',
  templateUrl: './project-requirements.component.html',
  styleUrls: ['./project-requirements.component.css']
})
export class ProjectRequirementsComponent implements OnInit {

  requirements: Requirement[] = [];
  closeResult: string;
  idProject: string;
  signedUserId: string;

  constructor(
    private requirementService: RequirementService,    
    private projectService: ProjectService,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.idProject = this.route.snapshot.paramMap.get('idProject');
    this.getProjectRequirements();    
    this.signedUserId = this.route.snapshot.paramMap.get('id');
  }

  getProjectRequirements() {
    this.projectService.getProjectRequirements(this.idProject).subscribe((result: { status: number, message: string, result: Requirement[] }) => {
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

  back() {
    this.router.navigate(["/analyst", {id: this.signedUserId}]);
  }

}


