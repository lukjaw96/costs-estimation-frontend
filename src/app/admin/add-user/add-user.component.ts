import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user/user.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  @Input() modal;

  newUser: User = {
    idUser: null,
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    role: '',
  }

  constructor(
    private userService: UserService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
  }

  addUser(newUser: User) {
    this.userService.addUser(newUser).subscribe(() => this.userService.getAllUsers().subscribe(() => { }));
    this.modalService.dismissAll();
  }
}