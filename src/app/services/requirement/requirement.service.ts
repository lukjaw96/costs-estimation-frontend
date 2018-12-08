import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Requirement } from 'src/app/models/Requirement';

@Injectable({
  providedIn: 'root'
})
export class RequirementService {

  rootAddress: string = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  getHttpHeaders() {
    return {
      headers: new HttpHeaders({
        'authorization': 'Bearer ' + sessionStorage.getItem('Bearer')
      })
    }
  }

  getAllRequirements() {
    return this.http.get(`${this.rootAddress}/requirements`, this.getHttpHeaders());
  }

  addRequirement(requirement: Requirement) {
    return this.http.post<Requirement>(`${this.rootAddress}/requirements/add`, requirement, this.getHttpHeaders());
  }
}
