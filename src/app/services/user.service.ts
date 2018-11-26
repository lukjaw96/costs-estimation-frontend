import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/User';


const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Basic ' + sessionStorage.getItem('token')
  })
};

//let options = { headers: httpOptions };

@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }  

  getAllUsers() {
    return this.http.get("http://localhost:8080/demo/users", httpOptions);
  }

  createUser(user: User) {
    return this.http.post<User>("http://localhost:8080/demo/users/add", user, httpOptions);
  }

  getUserById(id: number) {
    return this.http.get(`http://localhost:8080/demo/users/${id}`, httpOptions);
  }

  updateUser (user: User) {
    return this.http.put<User>(`http://localhost:8080/demo/users/${user.id}`, user, httpOptions);
  }

  deleteUser(id: number) {
    return this.http.delete(`http://localhost:8080/demo/users/${id}`, httpOptions);
  }

  //let url = 'http://localhost:8080/demo/user';

  // let headers:Headers = new Headers({
  //      'Authorization': 'Basic ' + sessionStorage.getItem('token')
  //  })
//let options = new RequestOptions({headers: headers});

//     let headers: HttpHeaders = new HttpHeaders();
// headers = headers.append('Authorization', 'Basic ' + sessionStorage.getItem('token'));

// const options = {
//   headers: new HttpHeaders().append('Authorization', 'Basic ' + sessionStorage.getItem('token')),
// }



// console.log("headers", headers);
// this.http.get(url, options).subscribe(principal => {
//   console.log(principal);
// });
}