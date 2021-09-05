import { Component, ViewChild, HostListener,OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BLACK_ON_WHITE_CSS_CLASS } from '@angular/cdk/a11y/high-contrast-mode/high-contrast-mode-detector';
import { constant as CONSTANT } from '../constants';
import { MultilevelNodes } from 'ng-material-multilevel-menu';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-app-survey',
  templateUrl: './app-survey.component.html',
  styleUrls: ['./app-survey.component.css']
})
export class AppSurveyComponent implements OnInit {

  opened = true;
  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;
  appitems: MultilevelNodes[] = CONSTANT.sidebarDemoLinks;
  config = CONSTANT.sidebarConfigurations;
  displayList = false;
  expandCollapseStatus: string = null;
  appbtn=false;
  formdata ;
  submitted=false;
  id=0;
  openform = false;
  updForm = true;
  updetail1=true;
  updetail2=true;
  opengrid = false; 
  openform1=false;
  openform2=false;
  surveyform=false;
  card=false;
  fileToUpload: File = null;
  updetail=true;

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private router: Router,
    
  ) {
    setTimeout(() => {
      this.displayList = true;
    }, 100);
    
  
  }

  selectedItem($event) {
    // console.log($event);
  }

 

  

  ngOnInit() {
    // console.log(window.innerWidth)
    if (window.innerWidth < 768) {
      this.sidenav.fixedTopGap = 87;
      this.opened = false;
    } else {
      this.sidenav.fixedTopGap = 87;
      this.opened = true;
    }
  }
 
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth < 768) {
      this.sidenav.fixedTopGap = 87;
      this.opened = false;
    } else {
      this.sidenav.fixedTopGap =87
      this.opened = true;
    }
  }

  isBiggerScreen() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width < 768) {
      return true;
    } else {
      return false;
    }
  }

  removeButton(){
    this.appbtn=true;
    return this.appbtn;
    
  }
  onClickOpenForm(){
    this.openform=true;
    this.updetail=false;
    this.updetail1=true;
    return this.openform;
    
  }

  onClickOpenForm1(){
    this.openform=false;
    this.openform1=true;
    this.updetail=true;
    this.updetail1=false;
    this.card=true;
    return this.openform1;
    return this.card;
    
    
  }

  onClickOpenForm2(){
    this.openform=false;
    this.openform1=false;
    this.openform2=true;
    this.updetail=true;
    this.updetail1=true;
    this.updetail2=false;
    return this.openform2;
    
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
}

goBack(){
  this.openform=false;
  this.openform1=false;
  this.openform2=false;
  this.updetail=true;
  this.updetail1=true;
  this.updetail2=true;
  this.appbtn=false;
  this.card=false;
  return this.appbtn;
}

offlineform(){
  this.surveyform=true;
}

sampleOrgs = [
  {
      "app": "App1",
      "desc": "Desc1",
     
      
  },
]
public gridData: any[] = this.sampleOrgs;
}

