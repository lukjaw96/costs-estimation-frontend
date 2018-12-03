import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service'
import { User } from '../models/User';
import { NewUser } from '../models/NewUser';
import { Router } from '@angular/router';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'admin-start-page',
  templateUrl: './admin-start-page.template.html',
})
export class AdminStartPage implements OnInit {
 
  constructor(
    private adminService: AdminService,
    private router: Router,
    private modalService: NgbModal
  ) { } 

  users: User[] = [];

  ngOnInit() {
    this.adminService.getAllUsers().subscribe((users: User[]) => {
      this.users = users;
    });
  }

  logout() {
    sessionStorage.setItem('Bearer', '');
    this.router.navigate(['login']);
  }

  closeResult: string;

  newUser: NewUser = {
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
    role: '',
  }



  open(content, user: User) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    if(user != null) {
      this.updatedUser.idUser = user.idUser;
      this.updatedUser.firstName = user.firstName;
      this.updatedUser.lastName = user.lastName;
      this.updatedUser.role = user.role;
      this.updatedUser.username = user.username;
    }
  }

  deleteUser(user: User) {
    this.adminService.deleteUser(user).subscribe(() =>     this.adminService.getAllUsers().subscribe((users: User[]) => {
      this.users = users;
    }));
  }

  addUser(newUser: NewUser) {
    this.adminService.addUser(newUser).subscribe(() =>     this.adminService.getAllUsers().subscribe((users: User[]) => {
      this.users = users;
    }));

    this.modalService.dismissAll();
  }

  updateUser(newUser: User) {
    this.adminService.updateUser(newUser).subscribe(() =>     this.adminService.getAllUsers().subscribe((users: User[]) => {
      this.users = users;
    }));

    this.modalService.dismissAll();
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  // addUser() {
  //   modal.close('Save click')
  // }

  
}
