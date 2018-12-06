import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserPasswordUpdate } from 'src/app/models/UserPasswordUpdate';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

  @Input() modal;
  @Input() idUser: number;

  updatePassword: {
    oldPassword: string,
    password: string
  } = {
      oldPassword: null,
      password: null
    }

  updatedUserPassword: UserPasswordUpdate = {
    idUser: null,
    oldPassword: null,
    password: null
  }

  constructor(private userService: UserService, private modalService: NgbModal) { }

  ngOnInit() {
  }

  updateUserPassword() {
    this.updatedUserPassword.idUser = this.idUser;
    this.updatedUserPassword.password = this.updatePassword.password;
    this.updatedUserPassword.oldPassword = this.updatePassword.oldPassword;

    this.userService.updateUserPassword(this.updatedUserPassword).subscribe(() => this.userService.getAllUsers().subscribe());
    this.modalService.dismissAll();
  }

}
