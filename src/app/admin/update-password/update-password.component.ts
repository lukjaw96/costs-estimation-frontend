import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
    oldPassword: '',
    password: ''
  }

  gotUpdateUserPassword: {
    idUser: number,    
    oldPassword: string,
    password: string
  } = {
    idUser: null,    
    oldPassword: '',
    password: ''
  }

  constructor(private userService: UserService, private modalService: NgbModal) { }

  ngOnInit() {
  }



  updateUserPassword() {

    this.gotUpdateUserPassword.idUser = this.idUser;
    this.gotUpdateUserPassword.password = this.updatePassword.password;
    this.gotUpdateUserPassword.oldPassword = this.updatePassword.oldPassword;

    this.userService.updateUserPassword(this.gotUpdateUserPassword).subscribe(() => this.userService.getAllUsers().subscribe());
    this.modalService.dismissAll();
  }

}
