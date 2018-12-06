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
    firstName: null,
    lastName: null,
    username: null,
    password: null,
    role: null
  };
  
  constructor(private userService: UserService, private modalService: NgbModal) { }

  ngOnInit() {
    this.updatedUser = Object.assign({}, this.updatedUserSend);
  }

  updateUser(updatedUser: User) {
    this.userService.updateUser(updatedUser).subscribe(() => this.userService.getAllUsers().subscribe());
    this.modalService.dismissAll();
  }

}
