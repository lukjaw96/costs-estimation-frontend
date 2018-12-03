import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  rootAddress: String = "http://localhost:8080";

  constructor(private http: HttpClient) { }
  
  login(model) {
    return this.http.post(`${this.rootAddress}/token/generate-token`, { username: model.username, password: model.password });
  }
}
