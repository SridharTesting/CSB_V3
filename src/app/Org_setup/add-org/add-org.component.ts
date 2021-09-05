import { Component, OnInit } from '@angular/core';
import {NgForm, FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import {HTTPService} from '../../service/httpService.service';
import { Organization } from '../../model/organization';

import {Router, ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-add-org',
  templateUrl: './add-org.component.html',
  styleUrls: ['./add-org.component.css']
})
export class AddOrgComponent implements OnInit {
  marked = false;
  theCheckbox = false;
  submitted=false;
  organization:Organization[];
org=new Organization();
  addLOB:FormGroup;
  errorMsg:string;
  orgList:Organization[];

    constructor(private service:HTTPService,private formBuilder: FormBuilder,private router:Router,private route: ActivatedRoute) { }
  

  ngOnInit(): void {
  }

  registerForm = this.formBuilder.group({
    orgName: ['', Validators.required],
    contactName:['', Validators.required],
  
    contact: ['', [Validators.required,Validators.pattern(/^[0-9]{10}$/)]],
    add1: ['', Validators.required],
   
    email : ['', [Validators.required,Validators.pattern(/^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/)]],
    zipCode : ['',Validators.pattern(/^[0-9]{6}$/)]
    
  });
  toggleVisibility(e){
    this.marked= e.target.checked;
  }
  saveOrg(){
    debugger;
    this.submitted= true;
  if(this.registerForm.invalid){
    return;
  }
    debugger;
console.log("HI");
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
this.service.createOrg(this.org).subscribe(
  data=>{
    console.log("data");
    
    this.registerForm.reset();
    this.router.navigate(['homePage/orgSetUp']);
    
    
    
  }
)
}



get f() { 
return this.registerForm.controls; 
} 
  
}
