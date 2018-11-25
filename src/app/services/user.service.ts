import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/User';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }  

  getAllUsers() {
    return this.http.get("http://localhost:8080/demo/users");
  }

  createUser(user: User) {
    return this.http.post<User>("http://localhost:8080/demo/users/add", user, httpOptions);
  }

  getUserById(id: number) {
    return this.http.get(`http://localhost:8080/demo/users/${id}`);
  }

  updateUser (user: User) {
    return this.http.put<User>(`http://localhost:8080/demo/users/${user.id}`, user, httpOptions);
  }

  deleteUser(id: number) {
    return this.http.delete(`http://localhost:8080/demo/users/${id}`, httpOptions);
  }
}