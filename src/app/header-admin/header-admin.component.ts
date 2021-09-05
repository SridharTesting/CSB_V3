import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css']
})
export class HeaderAdminComponent implements OnInit {
  orgName:any;
  userDisplayName:any;
  name:any;
  userName:any;
  loggedIn:boolean=true;


  constructor(private router: Router) { }

  ngOnInit(): void {
    this.orgName=sessionStorage.getItem("OrgName");
    this.userDisplayName = sessionStorage.getItem('username');
    this.name  = this.userDisplayName .substring(0, this.userDisplayName .lastIndexOf("@"));
   this.userName=this.name.charAt(0).toUpperCase();
  }


  ManagerUser(){
    this.router.navigate(['userSetup']);
  }

  landingpage(){
    this.router.navigate(['landing']);
  }
  logout(){
    this.router.navigate(['/']);
    sessionStorage.clear();
   }

}
