import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Estimation } from '../../models/Estimation';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstimationService {

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

  getAllEstimations() {
    return this.http.get(`${this.rootAddress}/estimations`, this.getHttpHeaders());
  }

  addEstimation(estimation: Estimation) {
    return this.http.post<Estimation>(`${this.rootAddress}/estimations/add`, estimation, this.getHttpHeaders());
  }

  getEstimationsRanges() {
    return this.http.get(`${this.rootAddress}/estimations/ranges`, this.getHttpHeaders());
  }
  
}
