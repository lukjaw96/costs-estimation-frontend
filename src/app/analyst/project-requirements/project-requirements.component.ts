import { Component, OnInit } from '@angular/core';
import { Requirement } from 'src/app/models/Requirement';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { RequirementService } from 'src/app/services/requirement/requirement.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-requirements',
  templateUrl: './project-requirements.component.html',
  styleUrls: ['./project-requirements.component.css']
})
export class ProjectRequirementsComponent implements OnInit {

  requirements: Requirement[] = [];
  closeResult: string;

  constructor(
    private requirementService: RequirementService,    
    private modalService: NgbModal,
    private router: Router 
  ) { }

  ngOnInit() {
    this.getAllRequirements();
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

  back() {
    this.router.navigate(["/analyst"]);
  }

}


