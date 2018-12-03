import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { LoginUser } from '../models/login/LoginUser';
import { ApiResponse } from '../models/login/ApiResponse';

@Component({
  selector: 'login',
  templateUrl: './login.template.html'
})
export class Login implements OnInit {

  model: LoginUser = {
    username: '',
    password: ''
  }

  result: ApiResponse = {
    status: null,
    message: '',
    result: {
      token: '',
      username: ''
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
      this.router.navigate(['admin']);
    });
  }
}
