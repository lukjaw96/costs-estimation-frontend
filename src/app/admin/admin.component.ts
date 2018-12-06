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

  updateSelfUser: User = {
    idUser: null,
    firstName: null,
    lastName: null,
    username: null,
    password: null,
    role: null,
  }

  signedUserId: string;

  constructor(
    private userService: UserService,
    private router: Router,
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

  openGetUser(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.getUser(this.route.snapshot.paramMap.get('id'));
  }

  logout() {
    sessionStorage.setItem('Bearer', '');
    this.router.navigate(['login']);
  }

  openUpdateUser(content, user: User) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.updatedUser = user;
  }

  getUser(idUser: string) {
    this.userService.getUser(idUser).subscribe((result: { status: number, message: string, result: User }) => {
      this.updateSelfUser = Object.assign({}, result.result);
    })
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
