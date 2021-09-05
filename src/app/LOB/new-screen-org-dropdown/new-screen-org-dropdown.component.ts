import { Component, OnInit } from '@angular/core';
import {NgForm, FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import {HTTPService} from '../../service/httpService.service';
import { Organization } from '../../model/organization';
import {LOB} from '../../model/LOB';
import {Router} from '@angular/router'
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/login/login.component';
@Component({
  selector: 'app-new-screen-org-dropdown',
  templateUrl: './new-screen-org-dropdown.component.html',
  styleUrls: ['./new-screen-org-dropdown.component.css']
})
export class NewScreenOrgDropdownComponent implements OnInit {

  selectedValue:any;
  org:any;
  submitted=false;
  organization:Organization[];
  lob =new LOB();
  addLOB:FormGroup;
  errorMsg:string;
  lobList:LOB[];
  textBox:Boolean=false;

  selectedDropdown:any="";

  options: string[] = [" Emerson", "Voya", "M&TBank"];
  selectedQuantity : any="";
  get formControls() { return this.addLOB.controls; }
    constructor(private service:HTTPService,private formBuilder: FormBuilder,private router:Router,private dialogue : MatDialog,
      public dialogRef: MatDialogRef<NewScreenOrgDropdownComponent>) { }

    ngOnInit(): void {
      this.orgDropdown();
    }
    registerForm = this.formBuilder.group({
      org: [''],
      name:[''],
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

    addDropdown(){
      this.textBox=true;

    }

    addOrg($event){
      console.log(this.registerForm.value.org);
      this.options.push[this.registerForm.value.org];
      console.log(this.options);
      this.textBox=false;
    }
    select(){
      sessionStorage.setItem("OrgName",this.selectedDropdown);

       this.dialogue.open(LoginComponent ,
            {
              height: '480px',
              width: '820px',
              disableClose:true,

            });
            this.dialogRef.close();



    }


    onChangeOfDropdown($event){
      console.log(this.registerForm.value.org);
      this.selectedDropdown=this.registerForm.value.org;

    }
  get f() {
    return this.registerForm.controls;
  }
  }
