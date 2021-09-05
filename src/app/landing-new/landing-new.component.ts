import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from './../service/authentication.service';
import { NewScreenOrgDropdownComponent } from '../LOB/new-screen-org-dropdown/new-screen-org-dropdown.component';

@Component({
  selector: 'app-landing-new',
  templateUrl: './landing-new.component.html',
  styleUrls: ['./landing-new.component.css']
})
export class LandingNewComponent implements OnInit {
  name:string;
  userDisplayName:string;
  userName:string;
  orgName:string="";
  loggedIn:boolean=true;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService) { }

    ngOnInit(): void {


      this.orgName=sessionStorage.getItem("OrgName");
  
        
          this.userDisplayName = sessionStorage.getItem('username');
              this.name  = this.userDisplayName .substring(0, this.userDisplayName .lastIndexOf("@"));
  
          }

          orgmenu(){
            this.router.navigate(['CsbDashboard']);
          } 


          aprdashboard(){
            this.router.navigate(['AprDashboard']);
          
           }
           configuration(){
            this.router.navigate(['userSetup']);
           }

    }