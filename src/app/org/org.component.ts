import { Component, ViewChild, HostListener, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BLACK_ON_WHITE_CSS_CLASS } from '@angular/cdk/a11y/high-contrast-mode/high-contrast-mode-detector';
import { constant as CONSTANT } from '../constants';
import { MultilevelNodes } from 'ng-material-multilevel-menu';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators ,FormBuilder} from '@angular/forms';

import { Organization } from '../model/organization';
import {HTTPService} from '../service/httpService.service';
import { getLocaleDateTimeFormat } from '@angular/common';
import { Observable } from "rxjs";
import { Directive, ElementRef } from '@angular/core';
@Component({
  selector: 'app-org',
  templateUrl: './org.component.html',
  styleUrls: ['./org.component.css']
})
export class OrgComponent implements OnInit {
  opened = true;
  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;
  appitems: MultilevelNodes[] = CONSTANT.sidebarDemoLinks;
  config = CONSTANT.sidebarConfigurations;
  displayList = false;
  expandCollapseStatus: string = null;
  myForm:FormGroup;
  openform=false;
  formdata ;
  deleteMessage:boolean;  
  submitted=false;
  id=0;
  orgbtn=false;
  name:any;
org:Organization=new Organization();
orgss: Observable<Organization[]>;
updForm = false;
opengrid = true; 
organisation:Array<any>;
items = [];
pageOfItems: Array<any>;
totalRecords:number;
page:number=1;
pageListdata=false;
userDisplayName:string;
userName:string;
  constructor(private iconRegistry: MatIconRegistry,private orgService: HTTPService,
    private sanitizer: DomSanitizer,private _el: ElementRef,
    private router: Router,private formBuilder: FormBuilder) {
      setTimeout(() => {
        this.displayList = true;
      }, 100);
      this.organisation = new Array<any>();
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
    this.userDisplayName = sessionStorage.getItem('username');
    console.log("sumana testing");
   this.name  = this.userDisplayName .substring(0, this.userDisplayName .lastIndexOf("@"));
console.log(this.name );
   this.userName=this.name.charAt(0).toUpperCase();
  
    console.log( this.userName);
    debugger;
    this.loadPage();
    console.log(window.innerWidth)
    
 

     
  }

   loadPage(){
    let response=this.orgService.getorgList();

    
    console.log(response);
   
    response.subscribe((data)=>{
 
    this.organisation=data;
this.pageListdata=true;
    this.totalRecords=this.organisation.length;
    console.log(this.totalRecords);
    console.log(this.page);


    }
    );
  }
  

  
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
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
    this.orgbtn=false;
    return this.orgbtn;
    
  }
  onClickOpenForm(){
    debugger;
    this.openform=true;
    return this.openform;
    
  }
  onClickOpenUForm(){
    this.updForm = true;
    this.opengrid = false;
    return this.updForm;
    
  }

  registerForm = this.formBuilder.group({
    orgName: ['', Validators.required],
    contactName:['', Validators.required],
    orgType:['', Validators.required],
    contact: ['', [Validators.required,Validators.pattern(/^[0-9]{10}$/)]],
    add1: ['', Validators.required],
    add2:['', Validators.required],
    email : ['', [Validators.required,Validators.pattern(/^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/)]],
    zipCode : ['',Validators.pattern(/^[0-9]{6}$/)]
    
  });



  updateForm = this.formBuilder.group({
    orgName: ['', Validators.required],
    contactName:['', Validators.required],
    orgType:['', Validators.required],
    contact: ['', [Validators.required,Validators.pattern(/^[0-9]{10}$/)]],
    add1: ['', Validators.required],
    add2:['', Validators.required],
    email : ['', [Validators.required,Validators.pattern(/^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/)]],
    zipCode : ['',Validators.pattern(/^[0-9]{6}$/)]
    
  });

  saveOrg(saveOrg){ 
debugger;
    this.org=new Organization();     
       
    this.org.orgName=this.registerForm.value.orgName;
    this.org.orgAdd=this.registerForm.value.add1;
    this.org.orgCntName=this.registerForm.value.contactName;
    this.org.orgCntMail=this.registerForm.value.email;
    this.org.orgPostCd=this.registerForm.value.zipCode;
    this.org.orgType=false;
this.org.orgCntNum=this.registerForm.value.contact;
this.org.orgId=this.registerForm.value.orgId;
this.org.recInsDt=new Date().toISOString();
this.org.recUpdDt=new Date().toISOString();
this.submitted = true; 
this.save(); 

var check = this.createNewRowData();
if(check) {
  //this.router.navigate(['ceo-main-page']);
  
  console.log("Org created");
  this.opengrid = false;
  this.openform = false;
  this.orgbtn =false;
  this.loadPage();
  this.registerForm.reset();
}else {
  console.log("updated ");
  this.openform = false;
  this.orgbtn =false;
  this.loadPage();
  this.registerForm.reset();
  return;
}
}  

 save() {
  debugger;  
  if(this.org.orgId==undefined){
  this.orgService.createOrg(this.org)  
  .subscribe(data => console.log(data), error => console.log(error));
  this.org=new Organization(); 
  }
  else{
    this.orgService.updateOrg(this.org).subscribe(data => console.log(data), error => console.log(error));
  }
  
} 

  get f() { 
    return this.registerForm.controls; 
  }  
    
  get f1(){
    return this.updateForm.controls; 
  }
  	



  deleteOrg(id: number) { 
    debugger; 
    this.orgService.deleteOrg(id)  
      .subscribe(  
        data => {  
          console.log(data);  
        
          this. loadPage();
          this.deleteMessage=true; 
          this.orgService.getorgList().subscribe(data =>{  
            this.org =data  
            })  
        },  
        error => console.log(error));  
  }  

  update(org){
    debugger;
this.orgService.setter(org);
this.org=this.orgService.getter()


this.openform=true;
this.registerForm = this.formBuilder.group({
  orgName: this.org.orgName,
  contactName:this.org.orgCntName,
  orgType:this.org.orgType,
  contact:this.org.orgCntNum,
  add1:this.org.orgAdd,
 
  email :this.org.orgCntMail,
  zipCode : this.org.orgPostCd,
  orgId:this.org.orgId
  
});



  }


  createNewRowData():boolean {
    if (this.registerForm.invalid) {
      console.log("Error");
      this.submitted = true;
		  return false;
    }
    else if(this.registerForm.value.orgId==undefined){
      console.log("Success");
      this.submitted = false;
      var newData = {
      
        orgname: this.f.orgName.value,
        contactname: this.f.contactName.value,
        orgtype: this.f.orgType.value,
        contact: this.f.contact.value,
        address1: this.f.add1.value,
        address2: this.f.add2.value,
        email: this.f.email.value,
        zipcode:this.f.zipCode.value
        
      };
      
      
      
      return true;
      
    }
    
    else {
      console.log("update the list");
      return false;
    }
  }
  public scrollToBottom() {
    const el: HTMLDivElement = this._el.nativeElement;
    el.scrollTop = Math.max(0, el.scrollHeight - el.offsetHeight);
  }

}
