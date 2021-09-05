import { Component, OnInit } from '@angular/core';

import {NgForm, FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import {HTTPService} from '../../service/httpService.service';
import { Organization } from '../../model/organization';
import {LOB} from '../../model/LOB';
import {Router, ActivatedRoute} from '@angular/router'
@Component({
  selector: 'app-edit-lob',
  templateUrl: './edit-lob.component.html',
  styleUrls: ['./edit-lob.component.css']
})
export class EditLobComponent implements OnInit {

  options:any;
  selectedValue:any;
  submitted=false;
  organization:Organization[];
  lob =new LOB();
  addLOB:FormGroup;
  errorMsg:string;
  lobList:LOB[];
  get formControls() { return this.addLOB.controls; }
    constructor(private service:HTTPService,private formBuilder: FormBuilder,private router:Router,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    debugger;
    let id=parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.service.fetchLOBByIDForUpdate(id).subscribe(
      data=>{
      console.log("data recieved");
      this.lob=data;
      this.registerForm=this.formBuilder.group({
        org: data.orgId,
        lobname:data.lobName,
        lobmanager:data.lobManager 
      })
     
    },
    error=>
      console.log("error")
    
    );
  }
  registerForm = this.formBuilder.group({
    org: [''],
    lobname:['', Validators.required],
    lobmanager:['', Validators.required] 
  });

  updateLOB(){
    debugger;
    this.lob.recInsDt=new Date().toISOString();
    this.lob.recUpdDt=new Date().toISOString();
    this.lob.lobName=this.registerForm.value.lobname;
    this.lob.lobManager=this.registerForm.value.lobmanager;
    this.lob.orgId=this.registerForm.value.org;

    this.service.updateLOB(this.lob).subscribe(data=>{
      console.log("inside updatelob");
      this.registerForm.reset();
      this.router.navigate(['homePage/loBsetup']);
    })
    error=>console.log("exception inside update");
  }
}
