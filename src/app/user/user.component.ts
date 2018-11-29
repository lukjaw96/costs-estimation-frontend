import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service'
import { User } from '../models/User'
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'user',
  templateUrl: './user.template.html'
})
export class UserComponent{
  model: any = {};

  constructor(
    private configService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
    ) { } 

    logout() {
        sessionStorage.setItem('token', '');
        this.router.navigate(['login']);
      }


  userId: number = 2;

  modelUser: {
    id: number,
    login: string,
    password: string,
    role: string
  } = {
    id: null,
    login: null,
    password: null,
    role: null
  }



  userToUpdate: {
    id: number,
    login: string,
    password: string,
    role: string
  } = {
    id: null,
    login: null,
    password: null,
    role: null
  }

  allUsers: User[] = [];
  user: User;

  userToDelete: number = null;

  getAllUsers() {  

  this.configService.getAllUsersService().subscribe((data: User[]) => {
      this.allUsers = data;
    });
  }

  createUser() {
    console.log("modelUser", this.modelUser);
    this.configService.createUser(this.modelUser).subscribe();
  }

  getUserById(id: number) {
    this.configService.getUserById(id)
    .subscribe((data: User) => {
      this.user = data;
    });
  }

  updateUser() {
    console.log("userToUpdate", this.userToUpdate);
    this.configService.updateUser(this.userToUpdate).subscribe();
  }

  deleteUser(id: number) {
    this.configService.deleteUser(id).subscribe();
  }

  userName: string;
}
