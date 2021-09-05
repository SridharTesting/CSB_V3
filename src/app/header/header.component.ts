import { Component, OnInit, ViewChild } from '@angular/core';
import { constant as CONSTANT } from '../constants';
import { MultilevelNodes } from 'ng-material-multilevel-menu';
import { Router, ActivatedRoute,NavigationEnd  } from '@angular/router';
import { MatAccordion } from '@angular/material/expansion';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { CSBComponent } from '../csb/csb.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  selected:any;
  userDisplayName:string;
  expandCollapseStatus: true;
  label:String;
  userName:string;
  name:string;
  currentRoute:string;
  selectedDashboard:string;
  inlandingpage=false;
  AprDashboard=false;
  configurations = CONSTANT.sidebarDemoLinks[0].items;
  abc = CONSTANT.sidebarDemoLinks[0].items[3];
  dashboard = CONSTANT.sidebarDemoLinks[5].items;
  reports=CONSTANT.sidebarDemoLinks[5].items[2];
  loggedIn:boolean=true;
  orgName: string;
  roleId:any;

  
  constructor( private router: Router,
    private route: ActivatedRoute ) { }

 



  ngOnInit(): void {
    this.orgName=sessionStorage.getItem("OrgName");
  
    this.roleId=sessionStorage.getItem("roleId");

    this.userDisplayName = sessionStorage.getItem('username');
    
   this.name  = this.userDisplayName .substring(0, this.userDisplayName .lastIndexOf("@"));
   //console.log(this.name );
   this.userName=this.name.charAt(0).toUpperCase();
   // console.log( this.userName);

    if(this.router.url == "/landing"){
      this.inlandingpage = true;
     
    }

    if(this.router.url == "/AprDashboard"){
      this.AprDashboard = true;
     
    }



   // console.log(this.router.url,"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    if(this.router.url !== "appque" && this.router.url !== "csb"){
      this.selected ="";
     // console.log("true");
    }
 

  }

  landingpage(){

    if(this.roleId==3)
    this.router.navigate(['userdashboard']);
    else
    this.router.navigate(['landing']);
  }
  cloudassist(){
    this.router.navigate(['/cloudassist']);
  }
  cra(){
    this.router.navigate(['/carAssessment']);
  }
Rlane(){
    this.router.navigate(['/csb_report']);
  }
  appSurvey(){
   
    this.router.navigate(['/appque']);
    if(this.router.url=="/appque"){
      sessionStorage.removeItem("appidfrompopup")
      window.location.reload();
    }
 
  }
  onclick()
  {
    document.getElementById("content").style.visibility='visible';
  }
  onupload()
  {
    this.router.navigate(['homePage/cloudassist']);
  }
  onupload1()
  {
    this.router.navigate(['homePage/orgSetUp']);
  }

  
  onupload2()
  {
    this.router.navigate(['homePage/userSetup']);
  }
  onclick1()
  {
    this.router.navigate(['homePage/development']);
  }
  oncra()
    {
      this.router.navigate(['homePage/carAssessment']);

    }
  oncloud()
  {
    this.router.navigate(['homePage/cloudassist']);
  }
  
  admin(){
    this.router.navigate(['homePage/admin']);
  }


  dash(){
    if(this.roleId!=3)
    this.router.navigate(['CsbDashboard']);
    else
    this.router.navigate(['userdashboard']);
  }
 csb(){
  this.router.navigate(['csb']);

 }
 rlanestatus(){
  this.router.navigate(['override']);

 }

 movegroup(){
  this.router.navigate(['moveGroup']);

 }

 app(){
  this.router.navigate(['appque']);

 }
 
 Infra(){
  this.router.navigate(['infra']);

 }
 
 lob(){
  this.router.navigate(['homePage/override']);

 }


 aprdashboard(){
  this.router.navigate(['AprDashboard']);

 }

 changed(){
   if(this.selected=="Organisation"){
    this.router.navigate(['csb']);
   }
 else  if(this.selected=="Application"){
  sessionStorage.removeItem('apploblist');
  sessionStorage.removeItem('appidfrompopup');
  sessionStorage.removeItem('appnamefrompopup');
   
    this.router.navigate(['appque']);
   }
   
 }

 Application(){
  this.router.navigate(['appdiscovery']);
 }
 logout(){
  this.router.navigate(['/']);
  sessionStorage.clear();
 }
}
