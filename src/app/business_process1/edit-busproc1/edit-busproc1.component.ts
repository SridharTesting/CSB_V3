import { Component, OnInit } from '@angular/core';
import {NgForm, FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import {HTTPService} from '../../service/httpService.service';
import { Organization } from '../../model/organization';

import {Router, ActivatedRoute} from '@angular/router'
import { BusinessProcess1 } from 'src/app/model/business-process1';

@Component({
  selector: 'app-edit-busproc1',
  templateUrl: './edit-busproc1.component.html',
  styleUrls: ['./edit-busproc1.component.css']
})
export class EditBusProc1Component implements OnInit {

  submitted=false;
  organization:Organization[];
  org=new Organization();
  businessprocess1:BusinessProcess1[];
  busproc1=new BusinessProcess1();
  addBusProc1:FormGroup;
  errorMsg:string;
  businessprocess1List:BusinessProcess1[];
  get formControls() { return this.addBusProc1.controls; }
    constructor(private service:HTTPService,private formBuilder: FormBuilder,private router:Router,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    debugger;
    let id=parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.service.fetchBusProc1ByIDForUpdate(id).subscribe(
      data=>{
      console.log("data recieved");
      this.busproc1=data;
      console.log(this.busproc1);
      this.registerForm=this.formBuilder.group({
        org: data.orgId,
        busprolevel1name:data.busproLevel1Name,
        busprolevel1desc:data.busproLevel1Desc
      })
     
    },
    error=>
      console.log("error")
    
    );
  }
  registerForm = this.formBuilder.group({
    org: [''],
    busprolevel1name:['', Validators.required],
    busprolevel1desc:['', Validators.required] 
  });
  updateBusProc1(){
    debugger;
    this.busproc1.recInsDt=new Date().toISOString();
    this.busproc1.recUpdDt=new Date().toISOString();
    this.busproc1.busproLevel1Name=this.registerForm.value.busprolevel1name;
    this.busproc1.busproLevel1Desc=this.registerForm.value.busprolevel1desc;
    this.busproc1.orgId=this.registerForm.value.org;

this.service.updateBusProc1(this.busproc1).subscribe(data=>{
  console.log("inside updatebusproc1");
  this.registerForm.reset();
  this.router.navigate(['homePage/busproc1SetUp']);
})
error=>console.log("exception inside update");
}
}
