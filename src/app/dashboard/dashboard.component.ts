import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  orgName:string="";
  constructor(private router: Router) { }

  ngOnInit(): void { this.orgName=sessionStorage.getItem("OrgName");
  }
  apr(){
    this.router.navigate(['homePage/dashapr']);
  }
  cloud(){
    this.router.navigate(['homePage/cloud']);
  }

  goBack(){
    this.router.navigate(['landing']);
  }
}
