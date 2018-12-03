import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users: User[] = [];

  closeResult: string;

  newUser: User = {
    idUser: null,
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    role: '',
  }

  updatedUser: User = {
    idUser: null,
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    role: '',
  }

  constructor(
    private adminService: UserService,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.adminService.getAllUsers().subscribe((users: User[]) => {
      this.users = users;
    });
  }

  logout() {
    sessionStorage.setItem('Bearer', '');
    this.router.navigate(['login']);
  }

  addUser(newUser: User) {
    this.adminService.addUser(newUser).subscribe(() => this.adminService.getAllUsers().subscribe((users: User[]) => {
      this.users = users;
    }));
    this.modalService.dismissAll();
  }

  updateUser(updatedUser: User) {
    this.adminService.updateUser(updatedUser).subscribe(() => this.adminService.getAllUsers().subscribe((users: User[]) => {
      this.users = users;
    }));
    this.modalService.dismissAll();
  }

  deleteUser(idUser: string) {
    this.adminService.deleteUser(idUser).subscribe(() => this.adminService.getAllUsers().subscribe((users: User[]) => {
      this.users = users;
    }));
  }

  openUpdateUser(content, user: User) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    if (user != null) {
      this.updatedUser.idUser = user.idUser;
      this.updatedUser.firstName = user.firstName;
      this.updatedUser.lastName = user.lastName;
      this.updatedUser.role = user.role;
      this.updatedUser.username = user.username;
    }
  }

  openAddUser(content) {
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
}
