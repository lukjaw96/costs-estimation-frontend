import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class LoginService {
    constructor( private http: HttpClient ) { }

    rootAddress: String = "http://localhost:8080";

    login(model) {
        return this.http.post(`${this.rootAddress}/token/generate-token`, {username: model.username, password: model.password});
    }
}
