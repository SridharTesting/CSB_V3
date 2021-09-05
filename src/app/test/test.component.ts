import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  orgName:string="";
  constructor( private router:Router) { }

  ngOnInit(): void {this.orgName=sessionStorage.getItem("OrgName");
}
  }
