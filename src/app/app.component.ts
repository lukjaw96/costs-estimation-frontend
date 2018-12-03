import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service'
import { User } from './models/User'
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'costs-estimation-frontend';
  model: any = {};

  constructor(
    private configService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
    ) { } 

  ngOnInit() {
    //sessionStorage.setItem('token', '');
  }

}
