import {Location} from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { RequiredValidator } from '@angular/forms';
import { Requirement } from 'src/app/models/Requirement';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-requirement-details',
  templateUrl: './requirement-details.component.html',
  styleUrls: ['./requirement-details.component.css']
})
export class RequirementDetailsComponent implements OnInit {

  requirement: Requirement;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _location: Location
  ) { }

  ngOnInit() {
    this.requirement = JSON.parse(this.route.snapshot.paramMap.get('requirement'));
  }

  back() {
    //this.router.navigate(["/expert"]);
    this._location.back();
  }


}
