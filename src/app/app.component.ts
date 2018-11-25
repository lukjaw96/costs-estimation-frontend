import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service'
import { User } from './models/User'
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'costs-estimation-frontend';
  model: any = {};

  constructor(
    private configService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
    ) { }
    
    ngOnInit() {
      sessionStorage.setItem('token', '');
  }

  login() {
      let url = 'http://localhost:8080/demo/login';
      console.log(this.model.username);
      console.log(this.model.password);
      this.http.post<Observable<boolean>>(url, {
        name: this.model.username,
        password: this.model.password
    }, httpOptions).subscribe(isValid => {
        if (isValid) {
            sessionStorage.setItem(
              'token', 
              btoa(this.model.username + ':' + this.model.password)
            );
            alert("isValid");
        this.router.navigate(['']);
        } else {
            alert("Authentication failed.")
        }
    });
  }

  userId: number = 2;

  userToCreate: User = {
    id: null,
    login: "createdUser",
    password: "createdPassword",
    role: "createdrole"
  }

  userToUpdate: User = {
    id: 5,
    login: "updatedUser",
    password: "updatedPassword",
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
