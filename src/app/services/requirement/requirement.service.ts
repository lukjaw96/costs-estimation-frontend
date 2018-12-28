import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Requirement } from 'src/app/models/Requirement';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequirementService {

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

  getRequirement(idRequirement: string) {
    return this.http.get(`${this.rootAddress}/requirements/${idRequirement}`, this.getHttpHeaders());
  }

  getAllRequirements() {
    return this.http.get(`${this.rootAddress}/requirements`, this.getHttpHeaders());
  }

  addRequirement(requirement: Requirement) {
    return this.http.post<Requirement>(`${this.rootAddress}/requirements/add`, requirement, this.getHttpHeaders());
  }

  getRequirementEstimations(idRequirement: string) {
    return this.http.get(`${this.rootAddress}/requirements/${idRequirement}/estimations`, this.getHttpHeaders());
  }

  getRequirementsParams() {
    return this.http.get(`${this.rootAddress}/requirements/params`, this.getHttpHeaders());
  }
}
