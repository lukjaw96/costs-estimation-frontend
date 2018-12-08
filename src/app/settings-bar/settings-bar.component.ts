import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../services/user/user.service';
import { User } from '../models/User';

@Component({
  selector: 'app-settings-bar',
  templateUrl: './settings-bar.component.html',
  styleUrls: ['./settings-bar.component.css']
})
export class SettingsBarComponent implements OnInit {

  closeResult: string;

  updateSelfUser: User = {
    idUser: null,
    firstName: null,
    lastName: null,
    username: null,
    password: null,
    role: null,
  }

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  logout() {
    sessionStorage.setItem('Bearer', '');
    this.router.navigate(['login']);
  }

  getUser(idUser: string) {
    this.userService.getUser(idUser).subscribe((result: { status: number, message: string, result: User }) => {
      this.updateSelfUser = Object.assign({}, result.result);
    })
  }

  openGetUser(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.getUser(this.route.snapshot.paramMap.get('id'));
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
