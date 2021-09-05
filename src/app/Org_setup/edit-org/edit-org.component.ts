import { Component, OnInit } from '@angular/core';
import {NgForm, FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import {HTTPService} from '../../service/httpService.service';
import { Organization } from '../../model/organization';

import {Router, ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-edit-org',
  templateUrl: './edit-org.component.html',
  styleUrls: ['./edit-org.component.css']
})
export class EditOrgComponent implements OnInit {

  submitted=false;
  organization:Organization[];
org=new Organization();
  addLOB:FormGroup;
  errorMsg:string;
  orgList:Organization[];
  marked = false;
  theCheckbox = false;
    constructor(private service:HTTPService,private formBuilder: FormBuilder,private router:Router,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    debugger;
    let id=parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.service.fetchOrgByIDForUpdate(id).subscribe(
      data=>{
      console.log("data recieved");
      this.org=data;
      console.log(this.org);
      this.registerForm=this.formBuilder.group({
        orgName: data.orgName,
        contactName:data.orgCntName,
        orgType:data.orgType,
        contact:data.orgCntNum,
        add1:data.orgAdd,
        
        email:data.orgCntMail,
        zipCode:data.orgPostCd
      })
     
    },
    error=>
      console.log("error")
    
    );
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
  updateOrg(){
    debugger;
  this.org.orgName=this.registerForm.value.orgName;
this.org.orgAdd=this.registerForm.value.add1;
this.org.orgCntName=this.registerForm.value.contactName;
this.org.orgCntMail=this.registerForm.value.email;
this.org.orgPostCd=this.registerForm.value.zipCode;
this.org.orgType=false;
this.org.orgCntNum=this.registerForm.value.contact;

this.org.recInsDt=new Date().toISOString();
this.org.recUpdDt=new Date().toISOString();
this.service.updateOrg(this.org).subscribe(data=>{
  console.log("inside updateorg");
  this.registerForm.reset();
  this.router.navigate(['homePage/orgSetUp']);
})
error=>console.log("exception inside update");
}
toggleVisibility(e){
  this.marked= e.target.checked;
}
}
