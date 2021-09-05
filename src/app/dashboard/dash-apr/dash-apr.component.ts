import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatRadioModule} from '@angular/material/radio';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-dash-apr',
  templateUrl: './dash-apr.component.html',
  styleUrls: ['./dash-apr.component.css']
})
export class DashAprComponent implements OnInit {

  orgName:string="";
  selectedRadio:any;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.orgName=sessionStorage.getItem("OrgName");
  }
  apr(){
    this.router.navigate(['homePage/aprDataComparsion']);
  }

}
