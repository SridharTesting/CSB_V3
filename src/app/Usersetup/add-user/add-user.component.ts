import { Component, OnInit } from '@angular/core';
import { user } from 'src/app/model/user';
import {NgForm, FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import {HTTPService} from '../../service/httpService.service';
import { Organization } from '../../model/organization';
import {LOB} from '../../model/LOB';
import {Router} from '@angular/router'

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  options:any;
  selectedValue:any;
  submitted=false;
  marked = false;
  theCheckbox = false;
  user =new user();
  form: FormGroup;
  
  errorMsg:string;
  userList:user[];
  orgId:any;
  get formControls() { return this.registerForm.controls; }
  constructor(private service:HTTPService,private formBuilder: FormBuilder,private router:Router,private Userservice: HTTPService) {
    this.form=this.formBuilder.group({
      userList:['']
    })
   
   }

  ngOnInit(): void {
    this.orgId=sessionStorage.getItem("orgId");
    this.LobDropdown();
  }
  registerForm = this.formBuilder.group({
   
    firstname:['', Validators.required],
    lastname:['', Validators.required],
    email : ['', [Validators.required,Validators.pattern(/^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/)]],
    password : ['', Validators.required],
    pswd:[''],
    lobId:['', Validators.required]
  });
  usersetup(){
    debugger;
    this.submitted= true;
  if(this.registerForm.invalid){
    return;
  }
    debugger;
console.log("HI");
this.user.recInsDt=new Date().toISOString();
this.user.recUpdDt=new Date().toISOString();
this.user.recType=false;
this.user.firstName=this.registerForm.value.firstname;
this.user.lastName=this.registerForm.value.lastname;
this.user.emailId=this.registerForm.value.email;
this.user.lobId=this.registerForm.value.lobId;
this.user.password=this.registerForm.value.password;
this.service.createUsers(this.user).subscribe(data=>{
  console.log("created data");
  this.registerForm.reset();
  this.router.navigate(['homePage/userSetup']);

})


  }
  
LobDropdown(){
  console.log("inside userList");
   this.Userservice.getLobs(this.orgId).subscribe(
    data=>{

      this.userList=data;
      console.log(this.userList);
      
    },
    error=>{
      this.errorMsg="Some error"
    }
    

       )
     

}
  toggleVisibility(e){
    this.marked= e.target.checked;
  }


}
