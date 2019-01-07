import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RoleService } from 'src/app/services/role/role.service';
import { Role } from 'src/app/models/Role';

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

  roles: Role[] = [];
  rolesCodes: string[] = [];
  
  constructor(private userService: UserService, private modalService: NgbModal, private roleService: RoleService) { }

  ngOnInit() {
    this.updatedUser = Object.assign({}, this.updatedUserSend);
    this.getAllRoles();
  }

  updateUser(updatedUser: User) {
    this.userService.updateUser(updatedUser).subscribe(() => this.userService.getAllUsers().subscribe());
    this.modalService.dismissAll();
  }

  getAllRoles() {
    this.roleService.getAllRoles().subscribe((result: { status: number, message: string, result: Role[] }) => {
      this.roles = result.result;
      this.roles.map(role => {
        this.rolesCodes.push(role.code);
      })
    });
  }

}
