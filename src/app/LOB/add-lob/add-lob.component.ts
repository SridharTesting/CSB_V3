import { Component, OnInit } from '@angular/core';
import {NgForm, FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import {HTTPService} from '../../service/httpService.service';
import { Organization } from '../../model/organization';
import {LOB} from '../../model/LOB';
import {Router} from '@angular/router'
@Component({
  selector: 'app-add-lob',
  templateUrl: './add-lob.component.html',
  styleUrls: ['./add-lob.component.css']
})
export class AddLobComponent implements OnInit {
options:any;
selectedValue:any;
submitted=false;
organization:Organization[];
lob =new LOB();
addLOB:FormGroup;
errorMsg:string;
lobList:LOB[];
get formControls() { return this.addLOB.controls; }
  constructor(private service:HTTPService,private formBuilder: FormBuilder,private router:Router) { }

  ngOnInit(): void {
    this.orgDropdown();
  }
  registerForm = this.formBuilder.group({
    org: [''],
    lobname:['', Validators.required],
    lobmanager:['', Validators.required] 
  });

  loadpage(){
    this.service.getorgList().subscribe(
      data=>{

        this.organization=data;
      },
      error=>{
        this.errorMsg="Some error"
      }
      

         )
       

  }

  lobsetup(){
    debugger;
    this.submitted= true;
  if(this.registerForm.invalid){
    return;
  }
    debugger;
console.log("HI");



this.lob.recInsDt=new Date().toISOString();
this.lob.recUpdDt=new Date().toISOString();
this.lob.lobName=this.registerForm.value.lobname;
this.lob.lobManager=this.registerForm.value.lobmanager;
this.lob.orgId=this.registerForm.value.org;
    this.service.createlob(this.lob).subscribe(
      data=>{
        console.log("data");
        
        this.registerForm.reset();
        this.router.navigate(['homePage/loBsetup']);
        
        
        
      }
    )
  }

  orgDropdown(){
    console.log("inside userList");
     this.service.getOrgs().subscribe(
      data=>{
  
        this.lobList=data;
        console.log(this.lobList);
        
      },
      error=>{
        this.errorMsg="Some error"
        
      }
      
  
         )
       
  
  }

get f() { 
  return this.registerForm.controls; 
} 
}
