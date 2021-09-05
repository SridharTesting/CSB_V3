import { Component, OnInit } from '@angular/core';
import { user } from 'src/app/model/user';
import {NgForm, FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import {HTTPService} from '../../service/httpService.service';
import { Organization } from '../../model/organization';
import {LOB} from '../../model/LOB';
import {Router, ActivatedRoute} from '@angular/router'
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  options:any;
  selectedValue:any;
  submitted=false;
 
  user =new user();
  
  errorMsg:string;
  userList:user[];
  get formControls() { return this.registerForm.controls; }
  constructor(private service:HTTPService,private formBuilder: FormBuilder,private router:Router,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    debugger;
    let id=parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.service.fetchUserByIDForUpdate(id).subscribe(
      data=>{
      console.log("data recieved");
      this.user=data;
      this.registerForm=this.formBuilder.group({
        lobId: data.lobId,
        firstname:data.firstName,
        lastname:data.lastName,
        email:data.emailId,
        password:data.password,
        pswd:data.password
      })
     
    },
    error=>
      console.log("error")
    
    );
  }
  registerForm = this.formBuilder.group({
   
    firstname:['', Validators.required],
    lastname:['', Validators.required],
    email : ['', [Validators.required,Validators.pattern(/^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/)]],
    password : ['', Validators.required],
    pswd:[''],
    lobId:['', Validators.required]
  });

  editUser(){
    this.user.recInsDt=new Date().toISOString();
    this.user.recUpdDt=new Date().toISOString();
    this.user.recType=false;
    this.user.firstName=this.registerForm.value.firstname;
    this.user.lastName=this.registerForm.value.lastname;
    this.user.emailId=this.registerForm.value.email;
    this.user.lobId=this.registerForm.value.lobId;
    this.user.password=this.registerForm.value.password;
    this.service.updateUser(this.user).subscribe(data=>{
      this.registerForm.reset();
      this.router.navigate(['homePage/userSetup']);
    },
    error=>console.log("exception occured"));

  }
}

