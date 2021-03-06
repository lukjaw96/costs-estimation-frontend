import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Project } from 'src/app/models/Project';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private rootAddress: string = environment.API_URL;
  //rootAddress: string = "http://localhost:8080";

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

  getProject(idProject: string) {
    return this.http.get(`${this.rootAddress}/projects/${idProject}`, this.getHttpHeaders());
  }

  updateProject(project: Project) {
    return this.http.put<Project>(`${this.rootAddress}/projects/${project.idProject}`, project, this.getHttpHeaders());
  }

  deleteProject(idProject: string) {
    return this.http.delete<Project>(`${this.rootAddress}/projects/${idProject}`, this.getHttpHeaders());
  }

  addRequirementToProject(idProject: string, idRequirement: string) {
    return this.http.post<string>(`${this.rootAddress}/projects/${idProject}/requirements/add/${idRequirement}`, null, this.getHttpHeaders());
  }

  getProjectRequirements(idProject: string) {
    return this.http.get(`${this.rootAddress}/projects/${idProject}/requirements`, this.getHttpHeaders());
  }
}
