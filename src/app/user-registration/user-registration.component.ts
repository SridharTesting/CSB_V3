import { Component, OnInit } from '@angular/core';
import {NgForm, FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import { user } from 'src/app/model/user';
import {Router} from '@angular/router'
import { HTTPService } from '../service/httpService.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { Organization } from '../model/organization';
// import {LOB} from '../model/LOB';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  options:any;
  selectedValue:any;
  submitted=false;
  marked = false;
  theCheckbox = false;
  user =new user();
  form: FormGroup;
  errorMsg:string;
  userList:user[];
  roleList:user[];
  orgId:any;
  uservalidation:any;
  get formControls() { return this.registerForm.controls; }
  constructor(private service:HTTPService,private formBuilder: FormBuilder,
    private router:Router,private Userservice: HTTPService,
    public dialogRef: MatDialogRef<UserRegistrationComponent>,
    private _snackBar: MatSnackBar) {
    this.form=this.formBuilder.group({
      userList:['']
    })
   
   }

  ngOnInit(): void {
    this.orgId=sessionStorage.getItem("orgId");
    this.LobDropdown();
    this.RoleDropdown();
    this.service.uservalidation().subscribe((data) => {
      this.uservalidation = data;
      // console.log(this.uservalidation,"uservalidationuservalidation")
    })
  }
  registerForm = this.formBuilder.group({
   
    firstname:['', Validators.required],
    lastname:['', Validators.required],
    email : ['', [Validators.required,Validators.pattern(/^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/)]],
    password : ['', Validators.required],
    pswd:['', Validators.required],
    lobId:['', Validators.required],
    UserRoleId:['', Validators.required]

  });
  usersetup(){
    // debugger;
    this.submitted= true;
   
    
  if(this.registerForm.invalid){
    return;
  }else if(this.registerForm.get('password').value!=this.registerForm.get('pswd').value)
  {
    this._snackBar.open('Password & Confirm Password do not Match','X');
    return;
  }
  let pushtodb = true;
this.uservalidation.map(f=>
  {
    if(this.registerForm.get('email').value==f.migration_Strategy){
      this._snackBar.open('User Email Id is already Registered','X');
      pushtodb = false;
    return;
    }
  })
 
if(pushtodb)
{
  this.user.recInsDt=new Date().toISOString();
this.user.recUpdDt=new Date().toISOString();
this.user.recType=false;
this.user.firstName=this.registerForm.value.firstname;
this.user.lastName=this.registerForm.value.lastname;
this.user.emailId=this.registerForm.value.email;
this.user.lobId=this.registerForm.value.lobId;
this.user.password=this.registerForm.value.password;
this.user.user_role_id=this.registerForm.value.UserRoleId;
this.service.createUsers(this.user).subscribe(data=>{
  this.dialogRef.close();
  this.registerForm.reset();
  this.router.navigate(['userSetup']);
  this._snackBar.open('User Added Successfully ','X');

})
}

  }
  
LobDropdown(){
  // console.log("inside userList");
   this.Userservice.getLobs(this.orgId).subscribe(
    data=>{

      this.userList=data;
      // console.log(this.userList);
      
    },
    error=>{
      this.errorMsg="Some error"
    }
    

       )
     

}
  
RoleDropdown(){
  // console.log("inside roleList");
   this.Userservice.getRoles().subscribe(
    data=>{

      this.roleList=data;
      // console.log(this.roleList,"aaaaaaaaaaaaaaaaa");
      
    },
    error=>{
      this.errorMsg="Some error"
    }
    

       )
     

}

}
