import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/models/User';

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

  getUser(idUser: string) {
    return this.http.get(`${this.rootAddress}/users/${idUser}`, this.getHttpHeaders());
  }

  addUser(user: User) {
    return this.http.post<User>(`${this.rootAddress}/users/add`, user, this.getHttpHeaders());
  }

  updateUser(user: User) {
    return this.http.put<User>(`${this.rootAddress}/users/${user.idUser}`, user, this.getHttpHeaders());
  }

  updateSelf(user: User) {
    return this.http.put<User>(`${this.rootAddress}/users/${user.idUser}/update-self`, user, this.getHttpHeaders());
  }

  updateUserPassword(user: {
    idUser: number,    
    oldPassword: string,
    password: string
  }) {
    return this.http.put<{
      idUser: number,    
      oldPassword: string,
      password: string
    }>(`${this.rootAddress}/users/${user.idUser}/password-update`, user, this.getHttpHeaders());
  }

  deleteUser(idUser: string) {
    return this.http.delete<User>(`${this.rootAddress}/users/${idUser}`, this.getHttpHeaders());
  }
}
