import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { AuthenticationService } from '../service/authentication.service';
import { FormBuilder, FormControl, FormGroup, Validators } from  '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {LOB} from '../model/LOB';
import { HTTPService } from '../service/httpService.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email= ''
  password = ''
  loginForm: FormGroup;
  invalidLogin = false;
  isSubmitted  =  false;
  successMessage="";
  lobList:LOB[];
  errorMsg="";
  orgId:any;


  showErrorMessage :any
  selectedDropdown:any;
  get formControls() { return this.loginForm.controls; }
  constructor(private router: Router,
    private loginservice: AuthenticationService,
    private service:HTTPService,
     private formBuilder: FormBuilder,
     public dialogRef: MatDialogRef<LoginComponent>

     ) { }

  ngOnInit(): void {
    this. orgDropdown();
    this.loginForm  =  this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      org:['',Validators.required]
  });


  }
  /*loginUser($event){
    event.preventDefault();
    console.log("hi");
    event.preventDefault();
  }
 checkLogin() {
    console.log(this.email);
    console.log(this.password);
    if (this.loginservice.authenticate(this.email, this.password)
    ) {
      this.router.navigate(['homepage']);
      this.invalidLogin = false
    } else
      this.invalidLogin = true
  }*/

  login(){
    debugger
    /*console.log(this.loginForm.value);
    this.isSubmitted = true;
    if (this.loginservice.authenticate(this.email, this.password)
    ) {
      console.log("Hiiiiiiiiiii")
      this.router.navigate(['homepage']);
      this.invalidLogin = false
    } else
      this.invalidLogin = true
  }*/
  this.isSubmitted = true;
  if(this.loginForm.invalid){
    return;
  }




  this.loginservice.authenticate(this.loginForm.value.email, this.loginForm.value.password).subscribe((result)=> {
    this.isSubmitted = true;
    this.invalidLogin = false;
    console.log(result);
    this.dialogRef.close();
    //sessionStorage.setItem('loggedUser', result.username);
    this.router.navigate(['landing']);
  }, () => {
    this.invalidLogin = true;

this.successMessage="Login failed, Invalid username or password , please try again";

console.log(this.successMessage);


  });


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
  onChangeOfDropdown($event){
    console.log(this.loginForm.value.org.id);
    this.selectedDropdown=this.loginForm.value.org.name;
    this.orgId=this.loginForm.value.org.id
    sessionStorage.setItem("OrgName",this.selectedDropdown);
    sessionStorage.setItem("orgId",this.orgId);

  }

}
