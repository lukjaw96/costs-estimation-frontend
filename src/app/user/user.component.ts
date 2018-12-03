import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service'
import { User } from '../models/User'
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'user',
  templateUrl: './user.template.html'
})
export class UserComponent{
  model: any = {};

  constructor(
    private configService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
    ) { }
}
