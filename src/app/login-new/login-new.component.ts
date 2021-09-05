import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { AuthenticationService } from '../service/authentication.service';
import { FormBuilder, FormControl, FormGroup, Validators } from  '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {LOB} from '../model/LOB';
import { HTTPService } from '../service/httpService.service';
import { MatSnackBar, MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,MatSnackBarModule } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login-new',
  templateUrl: './login-new.component.html',
  styleUrls: ['./login-new.component.css']
})
export class LoginNewComponent implements OnInit {
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
  orgdetails:any;
  uservalidation:any;
  userIdEmailMAp:any;

  get formControls() { return this.loginForm.controls; }
  constructor(private router: Router,
    private loginservice: AuthenticationService,
    private service:HTTPService,
     private formBuilder: FormBuilder,
     private _snackBar: MatSnackBar) { }

  ngOnInit(): void {this. orgDropdown();
    this.loginForm  =  this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      org:[''],
      userOrAdmin:['user',Validators.required]

  });
  this.service.uservalidation().subscribe((data) => {
    this.uservalidation = data;
    this.userIdEmailMAp = new Map<string,number>();
    // console.log(this.uservalidation,"userlist");
    
    this.uservalidation.map(m=>{
      this.userIdEmailMAp.set(m.migration_Strategy.toLowerCase(),m.num);
    })
  }); //end

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
  
    
  // console.log(this.loginForm.get('email').value,"email value");
  
   
  this.isSubmitted = true;

  



if(this.loginForm.get('userOrAdmin').value == 'admin'){
  if(this.userIdEmailMAp.get(this.loginForm.value.email) != 3) {
    this.loginForm.get('org').setValidators([Validators.required]);
  
  if(this.loginForm.get('org').value == ''){
    this._snackBar.open("Organization Field is Mandatory","X");
    return;
  }else{
   
    this.loginservice.authenticate(this.loginForm.value.email, this.loginForm.value.password).subscribe((result)=> {
      // debugger;
      this.isSubmitted = true;
      this.invalidLogin = false;
      // console.log(result);
    //   this.service.Orgname(this.loginForm.value.email).subscribe(
    //     data=>{
    // this.orgdetails = data;
    
    // sessionStorage.setItem("OrgName",this.orgdetails[0].org_name);
    // sessionStorage.setItem("orgId",this.orgdetails[0].org_Id);
    // sessionStorage.setItem("roleId",this.orgdetails[0].user_role_id)
    // sessionStorage.setItem("LobId",this.orgdetails[0].lob_Id)
    
    // this.router.navigate(['landing']);
    
    
    //     });
    this.router.navigate(['landing']);
      
    }, () => {
      this.invalidLogin = true;
  this.successMessage="Login failed, Invalid username or password, please try again";
  this._snackBar.open(this.successMessage,"X");
  
    });
  }
}
else{
  this._snackBar.open("Entered Email is not Registered as Admin, Please Login as a User","X");
}
}
else{
  if(this.userIdEmailMAp.get(this.loginForm.value.email) == 3)
{
  this.loginForm.get('org').clearValidators();
this.loginservice.authenticate(this.loginForm.value.email, this.loginForm.value.password).subscribe((result)=> {
  // debugger;
  this.isSubmitted = true;
  this.invalidLogin = false;
  this.service.Orgname(this.loginForm.value.email).subscribe(
    data=>{
this.orgdetails = data;

sessionStorage.setItem("OrgName",this.orgdetails[0].org_name);
sessionStorage.setItem("orgId",this.orgdetails[0].org_Id);
sessionStorage.setItem("roleId",this.orgdetails[0].user_role_id)
sessionStorage.setItem("LobId",this.orgdetails[0].lob_Id)

  this.router.navigate(['userdashboard']);


    });

}, () => {
  this.invalidLogin = true;
this.successMessage="Login failed, Invalid username or password , please try again";
this._snackBar.open(this.successMessage,"X");

});
}
else{
  this._snackBar.open("Entered Email is not Registered as User ,Please Login as a Admin","X");
}
}

  }

  orgDropdown(){
    // console.log("inside userList");
     this.service.getOrgs().subscribe(
      data=>{

        this.lobList=data;
        // console.log(this.lobList);

      },
      error=>{
        this.errorMsg="Some error"

      }


         )


  }
  onChangeOfDropdown($event){
    // console.log(this.loginForm.value.org.id);
    this.selectedDropdown=this.loginForm.value.org.name;
    this.orgId=this.loginForm.value.org.id;
    if(this.loginForm.get('userOrAdmin').value == 'admin')
    {
      sessionStorage.setItem("OrgName",this.selectedDropdown);
    sessionStorage.setItem("orgId",this.orgId);
  }

  }

 

}

