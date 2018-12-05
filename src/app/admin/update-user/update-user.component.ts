import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  @Input() updatedUserSend: User;
  @Input() modal;

  updatedUser: User ={
    idUser: null,
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    role: ''
  };
  
  constructor(private userService: UserService, private modalService: NgbModal) { }

  ngOnInit() {
    this.updatedUser.idUser = this.updatedUserSend.idUser;
    this.updatedUser.firstName = this.updatedUserSend.firstName;
    this.updatedUser.lastName = this.updatedUserSend.lastName;
    this.updatedUser.role = this.updatedUserSend.role;
    this.updatedUser.username = this.updatedUserSend.username;
    this.updatedUser.password = this.updatedUserSend.password;
  }

  updateUser(updatedUser: User) {
    this.userService.updateUser(updatedUser).subscribe(() => this.userService.getAllUsers().subscribe());
    this.modalService.dismissAll();
  }

}
