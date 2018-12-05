import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../models/User';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ApiResponse } from '../models/ApiResponse';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users: User[] = [];
  updatedUser: User;

  closeResult: string;

  



  gotUser: {
    idUser: number,
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    role: string,
  } = {
    idUser: null,
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    role: '',
  }

  @Input() signedUser: User;
  
  constructor(
    private userService: UserService,
    private router: Router,
    private modalService: NgbModal,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe((users: User[]) => {
      this.users = users;
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
    this.userService.getUser(idUser).subscribe((user: User) => {
      this.gotUser.idUser = user.idUser;
      this.gotUser.firstName = user.firstName;
      this.gotUser.lastName = user.lastName;
      this.gotUser.role = user.role;
      this.gotUser.username = user.username;
      this.gotUser.password = user.password;
    })
  }


  deleteUser(idUser: string) {
    this.userService.deleteUser(idUser).subscribe(() => this.userService.getAllUsers().subscribe((users: User[]) => {
      this.users = users;
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
