import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Project } from 'src/app/models/Project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  rootAddress: string = "http://localhost:8080";

  constructor( private http: HttpClient ) { }

  getHttpHeaders() {
    return {
      headers: new HttpHeaders({
        'authorization': 'Bearer ' + sessionStorage.getItem('Bearer')
      })
    }
  }

  getAllProjects() {
    return this.http.get(`${this.rootAddress}/projects`, this.getHttpHeaders());
  }

  addProject(project: Project) {
    return this.http.post<Project>(`${this.rootAddress}/projects/add`, project, this.getHttpHeaders());
  }
}
