import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/User';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class UserService {
  constructor(
      private http: HttpClient,
      private router: Router
    ) { }  

  getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + sessionStorage.getItem('token')
      })
    };
  }

  loginService(model) {
    return this.http.post<Observable<boolean>>('http://localhost:8080/demo/login', {
      login: model.login,
      password: model.password
  }, this.getHttpOptions()).subscribe(isValid => {
        if (isValid) {
            sessionStorage.setItem(
              'token', 
              btoa(model.login + ':' + model.password)
            );
            alert("isValid");

            //TODO zapytaci zastanowić się nad lepszą opcją 
            if(model.login == "admin") {
              this.router.navigate(['admin']);
            } else if(model.login == "user") {
              this.router.navigate(['user']);
            } else if(model.login == "user2") {
              this.router.navigate(['user']);
            }
            


        } else {
            alert("Authentication failed.")
        }
    });
    
  }

  getAllUsersService() {
    
    return this.http.get('http://localhost:8080/demo/users', this.getHttpOptions())
  }
  
  getAllUsers() {
    return this.http.get("http://localhost:8080/demo/users", this.getHttpOptions());
  }

  createUser(user: User) {
    return this.http.post<User>("http://localhost:8080/demo/users/add", user, this.getHttpOptions());
  }

  getUserById(id: number) {
    console.log('http options', this.getHttpOptions());
    return this.http.get(`http://localhost:8080/demo/users/${id}`, this.getHttpOptions());
  }

  updateUser (user: User) { 
    return this.http.put<User>(`http://localhost:8080/demo/users/${user.id}`, user, this.getHttpOptions());
  }

  deleteUser(id: number) {
    return this.http.delete(`http://localhost:8080/demo/users/${id}`, this.getHttpOptions());
  }
}