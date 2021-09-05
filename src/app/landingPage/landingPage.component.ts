import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { AuthenticationService } from './../service/authentication.service';
import { NewScreenOrgDropdownComponent } from '../LOB/new-screen-org-dropdown/new-screen-org-dropdown.component';

@Component({
    selector: 'app-landing-page',
    templateUrl: './landingPage.component.html',
    styleUrls: ['./landingPage.component.css']
  })

  export class LandingPageComponent implements OnInit {
    name:string;
    userDisplayName:string;
    userName:string;
    orgName:string="";
    loggedIn:boolean=true;
    constructor(private router: Router,
      private route: ActivatedRoute,
      private dialogue : MatDialog,
      private authService: AuthenticationService
      )
      { }



       ngOnInit() {
         this.orgName=sessionStorage.getItem("OrgName");

        if(!this.authService.isUserLoggedIn())
        {
            this.login();
            this.loggedIn=false;

        }
        this.userDisplayName = sessionStorage.getItem('username');
            this.name  = this.userDisplayName .substring(0, this.userDisplayName .lastIndexOf("@"));

        }
        apr(){
          this.router.navigate(['homePage/apr']);
        }
        admin(){
          this.router.navigate(['homePage/admin']);
        }


        dash(){
          this.router.navigate(['homePage/dash']);

        }

        cra(){
          this.router.navigate(['/carAssessment']);
        }
        login(){

          this.dialogue.open(LoginComponent ,
            {
              height: '600px',
              width: '820px',
              disableClose:true,
            });


        }


    onclick()
    {
      this.router.navigate(['homePage/carAssessment']);
    }
    onmig()
  {
    this.router.navigate(['homePage/cloudassist']);
  }
  onapp(){
    this.router.navigate(['homePage/aprcloud']);
  }


}


