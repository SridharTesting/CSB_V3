import { Component, OnInit } from '@angular/core';
import {NgForm, FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import {HTTPService} from '../../service/httpService.service';
import { BusinessProcess1 } from '../../model/business-process1';

import {Router, ActivatedRoute} from '@angular/router'
import { Organization } from 'src/app/model/organization';

@Component({
  selector: 'app-add-busproc1',
  templateUrl: './add-busproc1.component.html',
  styleUrls: ['./add-busproc1.component.css']
})
export class AddBusProc1Component implements OnInit {
  marked = false;
  theCheckbox = false;
  submitted=false;
  businessprocess1:BusinessProcess1[];
  busproc1=new BusinessProcess1();
  organization:Organization[];
  errorMsg:string;
  businessprocess1List:BusinessProcess1[];

  options:any;
selectedValue:any;
addBusProc1:FormGroup;
get formControls() { return this.addBusProc1.controls; }

    constructor(private service:HTTPService,private formBuilder: FormBuilder,private router:Router,private route: ActivatedRoute) { }
  

  ngOnInit(): void {
    this.orgDropdown();
  }
 

  registerForm = this.formBuilder.group({
    org: [''],
    busprolevel1name:['', Validators.required],
    busprolevel1desc:['', Validators.required] 
    
  });
  loadpage(){
    // this.service.getbusProc1List().subscribe(
    //   data=>{

    //     this.businessprocess1=data;
    //   },
    //   error=>{
    //     this.errorMsg="Some error"
    //   }
      this.service.getorgList().subscribe(
        data=>{
  
          this.organization=data;
        },
        error=>{
          this.errorMsg="Some error"
        }

         )
       

  }

 
  
  
  saveBusProc1(){
    debugger;
    this.submitted= true;
  if(this.registerForm.invalid){
    return;
  }
    debugger;
console.log("HI");



this.busproc1.recInsDt=new Date().toISOString();
this.busproc1.recUpdDt=new Date().toISOString();
this.busproc1.busproLevel1Name=this.registerForm.value.busprolevel1name;
this.busproc1.busproLevel1Desc=this.registerForm.value.busprolevel1desc;
this.busproc1.orgId=this.registerForm.value.org;
    this.service.createbusproc1(this.busproc1).subscribe(
      data=>{
        console.log("data");
        
        this.registerForm.reset();
        this.router.navigate(['homePage/busproc1SetUp']);
        
        
        
      }
    )
  }

  orgDropdown(){
    console.log("inside userList");
     this.service.getOrgs().subscribe(
      data=>{
  
        this.businessprocess1List=data;
        console.log(this.businessprocess1List);
        
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
