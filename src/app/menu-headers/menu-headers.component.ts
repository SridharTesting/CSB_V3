import { Component, OnInit, ViewChild } from '@angular/core';
import { constant as CONSTANT } from '../constants';
import { Router, ActivatedRoute } from '@angular/router';
import { MatAccordion } from '@angular/material/expansion';
import {MatRadioModule} from '@angular/material/radio';

@Component({
  selector: 'app-menu-headers',
  templateUrl: './menu-headers.component.html',
  styleUrls: ['./menu-headers.component.css']
})
export class MenuHeadersComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;
  userDisplayName:string;
  expandCollapseStatus: true;
  label:String;
  userName:string;
  name:string;
  selectedDashboard:string;
  configurations = CONSTANT.sidebarDemoLinks[0].items;
  abc = CONSTANT.sidebarDemoLinks[0].items[3];
  dashboard = CONSTANT.sidebarDemoLinks[5].items;
  reports=CONSTANT.sidebarDemoLinks[5].items[2];

  constructor( private router: Router,
    private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.userDisplayName = sessionStorage.getItem('username');
    console.log("sumana testing");
   this.name  = this.userDisplayName .substring(0, this.userDisplayName .lastIndexOf("@"));
   console.log(this.name );
   this.userName=this.name.charAt(0).toUpperCase();
    console.log( this.userName);

  }

  landingpage(){
    this.router.navigate(['/landing']);
  }
  cloudassist(){
    this.router.navigate(['/cloudassist']);
  }
  cra(){
    this.router.navigate(['/carAssessment']);
  }
  apr(){
    this.router.navigate(['/apr']);
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

    homepageRedirect(){
      this.router.navigate(['landing']);
    }
  oncloud()
  {
    this.router.navigate(['homePage/cloudassist']);
  }

}

