import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Role } from 'src/app/models/Role';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private rootAddress: string = environment.API_URL;
  //rootAddress: string = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  getHttpHeaders() {
    return {
      headers: new HttpHeaders({
        'authorization': 'Bearer ' + sessionStorage.getItem('Bearer')
      })
    }
  }

  getAllRoles() {
    return this.http.get(`${this.rootAddress}/roles`, this.getHttpHeaders());
  }

  addRole(role: Role) {
    return this.http.post<Role>(`${this.rootAddress}/roles/add`, role, this.getHttpHeaders());
  }

  getRole(idRole: string) {
    return this.http.get(`${this.rootAddress}/roles/${idRole}`, this.getHttpHeaders());
  }

  updateRole(role: Role) {
    return this.http.put<Role>(`${this.rootAddress}/roles/${role.idRole}`, role, this.getHttpHeaders());
  }

  deleteRole(idRole: string) {
    return this.http.delete<Role>(`${this.rootAddress}/roles/${idRole}`, this.getHttpHeaders());
  }
}
