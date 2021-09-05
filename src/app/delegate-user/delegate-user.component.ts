import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HTTPService } from '../service/httpService.service';
import { user } from 'src/app/model/user';


@Component({
  selector: 'app-delegate-user',
  templateUrl: './delegate-user.component.html',
  styleUrls: ['./delegate-user.component.css']
})
export class DelegateUserComponent implements OnInit {
lobdname:any;
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
  emaillist =[];
  LobId:any;
  email_Id:any;
  emailpwordcombo:any;
  userListdata:any;
  uservalidation:any;
  get formControls() { return this.registerForm.controls; }
  constructor(private service:HTTPService,private formBuilder: FormBuilder,
    private router:Router,private Userservice: HTTPService,
    public dialogRef: MatDialogRef< DelegateUserComponent>,
    private _snackBar: MatSnackBar) {
    this.form=this.formBuilder.group({
      userList:['']
    })
   
   }

  ngOnInit(): void {
    
    this.LobId=sessionStorage.getItem("LobId");
    
    
    this.orgId=sessionStorage.getItem("orgId");
    this.LobDropdown();
    this.RoleDropdown();

    this.Userservice.getUsersList(this.orgId).subscribe(
      data=>{

        this.userListdata=data;
        
        // console.log(this.userListdata);
      },
      error=>{
        this.errorMsg="Some error"
      })

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
   
    UserRoleId:['user', ]
    
  });

  
  usersetup(){
   
    this.submitted= true;
    let n = (Math.random() * (1000));
    n = Math.floor(n);
    let autopassword=this.registerForm.get('firstname').value+'@'+n;
    
    this.registerForm.get('password').setValue(autopassword);
    
    
  if(this.registerForm.invalid){
    this._snackBar.open('All fields are Mandatory','X');
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
this.user.lobId=this.LobId;
this.user.password=this.registerForm.value.password;
this.user.user_role_id=3;

this.service.createUsers(this.user).subscribe(data=>{
  this.dialogRef.close();
  
  this.emailnotify();
})

}
  }
  

RoleDropdown(){
  
   this.Userservice.getRoles().subscribe(
    data=>{

      this.roleList=data;
      // console.log(this.roleList,"aaaaaaaaaaaaaaaaa");
      
      
    },
    error=>{
      this.errorMsg="Some error"
    } )
}


emailnotify(){

  let obj={
    emailid:this.registerForm.get('email').value, password:this.registerForm.get('password').value
  }
  this.emaillist.push(obj);

    this.Userservice.sendMail(this.emaillist).subscribe(data=>{
        
        this._snackBar.open("User Added and Email Notification sent Successfully ", 'X');
      },(error)=>{
        alert(error)
        this._snackBar.open(error, 'X');
      },()=>{
        this.registerForm.reset();
      }
      );

  //     this.userList.map(m=>{
  //       this.emaillist.map(f=>{
          
  //         if(m['email_Id'] ==f){
  //           let obj = {emailid:'',password:''};
  //           obj.emailid = f;
  //           obj.password =atob(m['password']);
  //           this.emailpwordcombo.push(obj);
  //           console.log(this.emailpwordcombo,"sss");
            
  //         }
  //       })
  //     });
  // if(this.emaillist.length==0){
    
  //   this._snackBar.open('Please select a User to send Email Notification', 'X');
  // }
  //    else{
      
  
  // console.log(this.emailpwordcombo,"combo")

  //    }


    //  this.userListdata.map(m=>{
    //   this.emaillist.map(f=>{
        
    //     if(m['email_Id'] ==f){
    //       let obj = {emailid:'',password:''};
    //       obj.emailid = f;
    //       obj.password =atob(m['password']);
    //       this.emailpwordcombo.push(obj);
    //       console.log(this.emailpwordcombo,"sss");
          
    //     }
    //   })
    // });
  
    // if(this.emaillist.length==0){
  
    //   this._snackBar.open('Please select a User to send Email Notification', 'X');
    // }
    //    else{
        
    
    // console.log(this.emailpwordcombo,"combo");
    
    //   this.Userservice.sendMail(this.emailpwordcombo).subscribe(data=>{
    //       console.log(data);
    //       this._snackBar.open("Email Notification sent Successfully ", 'X');
    //     },(error)=>{
    //       alert(error)
    //       this._snackBar.open(error, 'X');
          
    //     },()=>{
          
      
    //     }
    //     );
    
    //   } 
  
    












    }
    LobDropdown(){
      // console.log("inside userList");
       this.Userservice.getLobs(this.orgId).subscribe(
        data=>{
    
          this.userList=data;
          // console.log(this.userList);
          this.userList.map(f=>{
            
            if(this.LobId==f.lobId)
            {
              this.lobdname=f["lobName"]
              // console.log(this.lobdname,"lobnamelobname");
              
            }

          })
        },
        error=>{
          this.errorMsg="Some error"
        }
        
    
           )
         
    
    }
}

