import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/models/User';
import { UserPasswordUpdate } from 'src/app/models/UserPasswordUpdate';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  rootAddress: string = "http://localhost:8080";

  constructor( private http: HttpClient ) { }

  getHttpHeaders() {
    return {
      headers: new HttpHeaders({
        'authorization': 'Bearer ' + sessionStorage.getItem('Bearer')
      })
    }
  }

  getAllUsers() {
    return this.http.get(`${this.rootAddress}/users`, this.getHttpHeaders());
  }

  addUser(user: User) {
    return this.http.post<User>(`${this.rootAddress}/users/add`, user, this.getHttpHeaders());
  }

  getUser(idUser: string) {
    return this.http.get(`${this.rootAddress}/users/${idUser}`, this.getHttpHeaders());
  }

  updateUser(user: User) {
    return this.http.put<User>(`${this.rootAddress}/users/${user.idUser}`, user, this.getHttpHeaders());
  }

  updateSelf(user: User) {
    return this.http.put<User>(`${this.rootAddress}/users/${user.idUser}/update-self`, user, this.getHttpHeaders());
  }

  updateUserPassword(user: UserPasswordUpdate) {
    return this.http.put<UserPasswordUpdate>(`${this.rootAddress}/users/${user.idUser}/password-update`, user, this.getHttpHeaders());
  }

  deleteUser(idUser: string) {
    return this.http.delete<User>(`${this.rootAddress}/users/${idUser}`, this.getHttpHeaders());
  }
}
