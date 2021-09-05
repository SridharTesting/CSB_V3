import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-apr',
  templateUrl: './header-apr.component.html',
  styleUrls: ['./header-apr.component.css']
})
export class HeaderAprComponent implements OnInit {

  loggedIn:boolean=true;
  orgName: string
  userDisplayName:string;
  userName:string;
  name:string;
  constructor(private router: Router,) { }

  ngOnInit(): void {
   
    this.orgName=sessionStorage.getItem("OrgName");
    this.userDisplayName = sessionStorage.getItem('username');
   this.name  = this.userDisplayName .substring(0, this.userDisplayName .lastIndexOf("@"));
   this.userName=this.name.charAt(0).toUpperCase();
  }
 
  landingpage(){
    this.router.navigate(['landing']);
  }

  compareversion(){
    this.router.navigate(['datacomparsion']);
  }

  
  aprdashboard(){
    this.router.navigate(['AprDashboard']);
  
   }
   maintainapr(){
    this.router.navigate(['maintainapr']);
  }
  upload(){
    this.router.navigate(['uploadfilesnew']);
  }

  logout(){
    this.router.navigate(['/']);
    sessionStorage.clear();
   }
}
