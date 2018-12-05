import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user/user.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-update-self',
  templateUrl: './update-self.component.html',
  styleUrls: ['./update-self.component.css']
})
export class UpdateSelfComponent implements OnInit {

  @Input() gotUser: User;
  @Input() modal;

  idUser: string;
  closeResult: string;

  constructor(
      private userService: UserService, 
      private modalService: NgbModal
    ) { }

  ngOnInit() {
  }

  openUpdateUserPassword(content, idUser: string) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.idUser = idUser;    
  }

  updateUserSelf(updatedUser: User) {
    this.userService.updateSelf(updatedUser).subscribe(() => this.userService.getAllUsers().subscribe());
    this.modalService.dismissAll();
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
