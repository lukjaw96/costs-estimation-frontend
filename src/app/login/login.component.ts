import { Component, OnInit } from '@angular/core';
import { LoginUser } from '../models/LoginUser';
import { ApiResponse } from '../models/ApiResponse';
import { LoginService } from '../services/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: LoginUser = {
    username: null,
    password: null
  }

  result: ApiResponse = {
    status: null,
    message: null,
    result: {
      token: null,
      username: null,
      userId: null,
      role: null
    }
  }

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
    sessionStorage.setItem('Bearer', '');
  }

  login() {
    this.loginService.login(this.model).subscribe((result: ApiResponse) => {
      sessionStorage.setItem('Bearer', result.result.token);
      this.router.navigate([result.result.role.toLowerCase(), { id: result.result.userId }]);
    });
  }
}
