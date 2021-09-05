
import { Component, ViewChild, HostListener } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BLACK_ON_WHITE_CSS_CLASS } from '@angular/cdk/a11y/high-contrast-mode/high-contrast-mode-detector';
import { constant as CONSTANT } from '../constants';
import { MultilevelNodes } from 'ng-material-multilevel-menu';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import {Validators, FormBuilder} from '@angular/forms';


@Component({
  selector: 'app-cloud-assist',
  templateUrl: './cloud-assist.component.html',
  styleUrls: ['./cloud-assist.component.css']
})
export class CloudAssistComponent {

  opened = true;
  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;
  appitems: MultilevelNodes[] = CONSTANT.sidebarDemoLinks;
  config = CONSTANT.sidebarConfigurations;
  displayList = false;
  openform=false;
  carbtn=true;
  openform1=false;
  openform2=false;
  openform3=false;
  openform4=false;
  dispinfo1=false;
  dispinfo2=false;
  dispinfo3=false;
  dispinfo4=false;
  expandCollapseStatus: string = null;
  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private router: Router, private formBuilder: FormBuilder
  ) {
    setTimeout(() => {
      this.displayList = true;
    }, 100);
    
  
  }

  selectedItem($event) {
    console.log($event);
  }

  selectedLabel($event) {
    console.log($event);
  }

  redirect(link) {
    this.router.navigate([link]);
    setTimeout(() => {
      this.displayList = true;
    }, 100);
  }

  setExpandCollapseStatus(type) {
    this.expandCollapseStatus = type;
  }

  ngOnInit() {
    this.onClickOpenForm1();
    console.log(window.innerWidth)
    if (window.innerWidth < 768) {
      this.sidenav.fixedTopGap = 87;
      this.opened = false;
    } else {
      
      this.opened = true;
    }
  }
 
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth < 768) {
      this.sidenav.fixedTopGap = 87;
      this.opened = false;
    } else {
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

  registerForm = this.formBuilder.group({
    ca1:['', Validators.required],
    ca2:['',Validators.required],
    ca3:['',Validators.required],
    ca4:['',Validators.required]
  });
  registerForm1 = this.formBuilder.group({
    ca1:['', Validators.required],
    ca2:['',Validators.required],
    ca3:['',Validators.required],
    ca4:['',Validators.required]
  });
  registerForm2 = this.formBuilder.group({
    ca1:['', Validators.required],
    ca2:['',Validators.required],
    ca3:['',Validators.required],
    ca4:['',Validators.required]
  });
  registerForm3 = this.formBuilder.group({
    ca1:['', Validators.required],
    ca2:['',Validators.required],
    ca3:['',Validators.required],
    ca4:['',Validators.required]
  });
  registerForm4 = this.formBuilder.group({
    ca1:['', Validators.required],
    ca2:['',Validators.required],
    ca3:['',Validators.required],
    ca4:['',Validators.required]
  });

  removeButton(){
    this.carbtn=false;
    return this.carbtn;
    
  }
  onClickOpenForm1(){
    if(this.openform1){
      this.openform1 = false;
    }
    this.openform=true;
    return this.openform;
    
  }

  onClickOpenForm2(){
    if(this.openform){
      this.openform = false;
    }
    this.openform1=true;
    return this.openform1;
    
  }

  onClickOpenForm3(){
    if(this.openform1){
      this.openform1 = false;
    }
    this.openform2=true;
    return this.openform2;
    
  }
  onClickOpenForm4(){
    if(this.openform2){
      this.openform2 = false;
    }
    this.openform3=true;
    return this.openform2;
    
  }
  onClickOpenForm5(){
    if(this.openform3){
      this.openform3 = false;
    }
    this.openform4=true;
    return this.openform4;
    
  }
  displayinfo1(){
    this.dispinfo1=true;
    return this.dispinfo1;
  }
  displayinfo2(){
    this.dispinfo2=true;
    return this.dispinfo2;
  }
  displayinfo3(){
    this.dispinfo3=true;
    return this.dispinfo3;
  }
  displayinfo4(){
    this.dispinfo4=true;
    return this.dispinfo4;
  }
  
  

}