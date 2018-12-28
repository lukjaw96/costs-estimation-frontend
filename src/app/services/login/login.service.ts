import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private rootAddress: string = environment.API_URL;
  //rootAddress: string = "http://localhost:8080";

  constructor(private http: HttpClient) { }
  
  login(model) {
    return this.http.post(`${this.rootAddress}/token/generate-token`, { username: model.username, password: model.password });
  }
}
