import { Component } from '@angular/core';
import { UserService } from './services/user.service'
import { User } from './models/User'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'costs-estimation-frontend';

  constructor(private configService: UserService) { }  

  userId: number = 2;

  userToCreate: User = {
    id: null,
    login: "createdUser",
    password: "createdPassword",
    name: "createdName",
    surname: "createdSurname",
    role: "createdrole"
  }

  userToUpdate: User = {
    id: 5,
    login: "updatedUser",
    password: "updatedPassword",
    name: "updatedName",
    surname: "updatedSurname",
    role: "updatedrole"
  }

  allUsers: User[] = [];
  user: User;

  getAllUsers() {
    this.configService.getAllUsers()
    .subscribe((data: User[]) => {
      this.allUsers = data;
    });
  }

  createUser(userToCreate: User) {
    this.configService.createUser(userToCreate).subscribe();
  }

  getUserById(id: number) {
    this.configService.getUserById(id)
    .subscribe((data: User) => {
      this.user = data;
    });
  }

  updateUser(userToUpdate: User) {
    this.configService.updateUser(userToUpdate).subscribe();
  }

  deleteUser(id: number) {
    this.configService.deleteUser(id).subscribe();
  }

}

