import { Component, OnInit, Input } from '@angular/core';
import { Requirement } from 'src/app/models/Requirement';

@Component({
  selector: 'app-requirement-list',
  templateUrl: './requirement-list.component.html',
  styleUrls: ['./requirement-list.component.css']
})
export class RequirementListComponent implements OnInit {

  @Input() requirements: Requirement[];

  constructor() { }

  ngOnInit() {
  }

}
