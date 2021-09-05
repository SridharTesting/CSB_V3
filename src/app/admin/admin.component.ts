import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  orgName:string="";
  constructor( private router:Router) { }

  ngOnInit(): void {
    this.orgName=sessionStorage.getItem("OrgName");
  }

  user(){
    this.router.navigate(['homePage/userSetup']);
  }

  captureinfo(){
    this.router.navigate(['homePage/capture']);
  }



  goBack(){
    this.router.navigate(['homePage/landing']);
  }

}
