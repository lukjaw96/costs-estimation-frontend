import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  roles: String[] = ["PROJECT_MANAGER", "ANALYST", "EXPERT", "ADMIN"];


  profileForm: FormGroup;


  constructor(
    private userService: UserService,
    private modalService: NgbModal
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
  }

  get username() { return this.profileForm.get('username'); }
  get password() { return this.profileForm.get('password'); }




  onSubmit(newUser: User) {
    Object.assign(newUser, this.profileForm.value);
    this.userService.addUser(newUser).subscribe(() => this.userService.getAllUsers().subscribe());
    this.modalService.dismissAll();

    
  }
}
