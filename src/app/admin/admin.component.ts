import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../models/User';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users: User[] = [];
  updatedUser: User;
  closeResult: string;
  signedUserId: string;

  constructor(
    private userService: UserService,
    private modalService: NgbModal,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getAllUsers();
    this.signedUserId = this.route.snapshot.paramMap.get('id');
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe((result: { status: number, message: string, result: User[] }) => {
      this.users = result.result;
    });
  }

  openUpdateUser(content, user: User) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.updatedUser = user;
  }

  deleteUser(idUser: string) {
    this.userService.deleteUser(idUser).subscribe(() => this.userService.getAllUsers().subscribe((result: { status: number, message: string, result: User[] }) => {
      this.users = result.result;
    }));
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
