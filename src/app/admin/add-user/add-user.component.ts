import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RoleService } from 'src/app/services/role/role.service';
import { Role } from 'src/app/models/Role';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  @Input() modal;

  newUser: User = {
    idUser: null,
    firstName: null,
    lastName: null,
    username: null,
    password: null,
    role: null,
  }

  roles: Role[] = [];
  rolesCodes: string[] = [];


  profileForm: FormGroup;


  constructor(
    private userService: UserService,
    private modalService: NgbModal,
    private roleService: RoleService
  ) { }

  ngOnInit() {

    this.profileForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      username: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ]),
      role: new FormControl('')
    });
    this.getAllRoles();    
  }

  get username() { return this.profileForm.get('username'); }
  get password() { return this.profileForm.get('password'); }

  onSubmit(newUser: User) {
    Object.assign(newUser, this.profileForm.value);
    
    if(newUser.role=="") {
      this.newUser.role = this.roles[0].code;
    }
    this.userService.addUser(newUser).subscribe(() => this.userService.getAllUsers().subscribe());
    this.modalService.dismissAll();
  }

  getAllRoles() {
    this.roleService.getAllRoles().subscribe((result: { status: number, message: string, result: Role[] }) => {
      this.roles = result.result;
      this.newUser.role = this.roles[0].code;
      this.roles.map(role => {
        this.rolesCodes.push(role.code);
      })
    });
  }
}
