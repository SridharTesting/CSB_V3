import { Component, Inject, OnInit } from '@angular/core';
import { HTTPService } from '../service/httpService.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { user } from '../model/user';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  lobid:any;
  userroleid:any;
  activatedRoute:any;
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
  registerForm:any;
  uservalidation:any;
  
  constructor(private service:HTTPService,    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,private router:Router,private Userservice: HTTPService) {
    this.form=this.formBuilder.group({
      userList:['']
    })
   
   }

  ngOnInit(): void {
    this.user = this.data.userdata;
    
    
    this.orgId=sessionStorage.getItem("orgId");
    this.LobDropdown();
    this.RoleDropdown();


    this.registerForm = this.formBuilder.group({
   
      firstname:[this.user['first_Name'], Validators.required],
      lastname:[this.user['last_Name'], Validators.required],
      email : [this.user['email_Id'], [Validators.required,Validators.email]],
      lobId:[this.user['lob_Name'], Validators.required],
      UserRoleId:[this.user['user_role_type'], Validators.required]

  
    });
    

    


    this.registerForm.get('lobId').valueChanges.subscribe(value=>{
      this.userList.map(m=>{
        if(m['lobName']==value){
          this.lobid = m['lobId'];
        }
      })
    })

    this.registerForm.get('UserRoleId').valueChanges.subscribe(value=>{
      this.roleList.map(m=>{
        if(m['UserRoleType']==value){
          this.userroleid = m['UserRoleId'];
          
        }
      });
    })

    this.service.uservalidation().subscribe((data) => {
      this.uservalidation = data;
      // console.log(this.uservalidation,"uservalidationuservalidation")
    })
    
  }
 
  usersetup(){
    this.submitted= true;
    // console.log(this.registerForm.value,"log")
  if(this.registerForm.invalid){
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
this.user.userId = this.data.userdata.usr_Id;
this.user.recType=false;
this.user.firstName=this.registerForm.value.firstname;
this.user.lastName=this.registerForm.value.lastname;
this.user.emailId=this.registerForm.value.email;
this.user.lobId=this.lobid;
this.user.password=this.data.userdata.password;
this.user.user_role_id=this.userroleid;
this.service.updateUser(this.user).subscribe(data=>{
  
  
  this.router.navigate(['userSetup']);
  this._snackBar.open(
    'updated successfully',
    'X')
},   


);

}


  }
  
LobDropdown(){
  // console.log("inside userList");
   this.Userservice.getLobs(this.orgId).subscribe(
    data=>{

      this.userList=data;
      this.userList.map(m=>{
        if(m['lobName']==this.registerForm.get('lobId').value){
          this.lobid = m['lobId'];
        }
      });
      
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
      this.roleList.map(m=>{
        if(m['UserRoleType']==this.registerForm.get('UserRoleId').value){
          this.userroleid = m['UserRoleId'];
          
        }
      });
      
      
    },
    error=>{
      this.errorMsg="Some error"
    }
    

       )
     

}

}
