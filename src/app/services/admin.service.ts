import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { NewUser } from '../models/NewUser';
import { User } from '../models/User';

@Injectable()
export class AdminService {

    constructor( private http: HttpClient ) { }

    rootAddress: string = "http://localhost:8080";

    getHttpHeaders() {
        return {
          headers: new HttpHeaders({
            'authorization': 'Bearer ' + sessionStorage.getItem('Bearer')
          })
        };
    }

    getAllUsers() {
        return this.http.get(`${this.rootAddress}/users`, this.getHttpHeaders());
    }

    addUser(user: NewUser) {
        return this.http.post<NewUser>(`${this.rootAddress}/users/add`, user, this.getHttpHeaders());
    }

    updateUser(user: User) {
        return this.http.put<User>(`${this.rootAddress}/users/${user.idUser}`, user, this.getHttpHeaders());
    }

    deleteUser(user: User) {
        return this.http.delete<User>(`${this.rootAddress}/users/${user.idUser}`, this.getHttpHeaders());
    }
}
