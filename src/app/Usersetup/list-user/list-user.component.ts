import { Component, OnInit ,ViewChild} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { user } from 'src/app/model/user';
import { constant as CONSTANT } from '../../constants';
import { MultilevelNodes } from 'ng-material-multilevel-menu';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router,NavigationEnd ,RouterEvent  } from '@angular/router';
import {HTTPService} from '../../service/httpService.service';
import { filter } from 'rxjs/operators';
import { ElementRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators ,FormBuilder} from '@angular/forms';
import * as XLSX from "xlsx";
import { UserRegistrationComponent } from '../../user-registration/user-registration.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../dialog/dialog.component';
import { UpdateUserComponent } from '../../update-user/update-user.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteapplicationPopupComponent } from 'src/app/deleteapplication-popup/deleteapplication-popup.component';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';
@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  emailpwordcombo = [];
  emaillist =[];
  caUsrTbl: any;
  http: any;
  fileName = "mustu.xlsx";
  expandCollapseStatus='expand'
  opened = true;
  userList:user[];
  orgId:any;
  errorMsg:string;
  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;
  appitems: MultilevelNodes[] = CONSTANT.sidebarDemoLinks;
  config = CONSTANT.sidebarConfigurations;
  displayList = false;
  pageOfItems: Array<any>;
totalRecords:number;
page:number=1;
display=false;
constructor(private iconRegistry: MatIconRegistry,private Userservice: HTTPService,
  private sanitizer: DomSanitizer,private _el: ElementRef,
  private router: Router,private formBuilder: FormBuilder,public dialog: MatDialog,
   private _snackBar: MatSnackBar) {
    setTimeout(() => {
      this.displayList = true;
    }, 100);

   
   }
  

  ngOnInit(): void {

    this.orgId=sessionStorage.getItem("orgId");
    this.emailpwordcombo = [];
    this.loaduserslist();
    // this.router.events.pipe(filter((event: RouterEvent) => event instanceof NavigationEnd)
        
    //   ).subscribe(() => {  
                  
            
    //                  this.loadpage();
    //                 } );
  }


  exportexcel():void{
    let element = document.getElementById("table");
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,"sheet1");
    XLSX.writeFile(wb,this.fileName);
    
    }

  loaduserslist(){
    
    this.userList=[];
    this.Userservice.getUsersList(this.orgId).subscribe(
      data=>{

        this.userList=data;
        
        // console.log(this.userList);
      },
      error=>{
        this.errorMsg="Some error"
      })
       

  }
  selectedItem($event) {
    // console.log($event);
  }
  setExpandCollapseStatus(type) {
    this.expandCollapseStatus = type;
  }

  selectedLabel($event) {
    // console.log($event);
  }
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
}
  redirect(link) {
    this.router.navigate([link]);
    setTimeout(() => {
      this.displayList = true;
    }, 100);
  }

  addNewUser(){
    this.router.navigate(['userRegistration']);
  }
  editUser(id:number){
    this.router.navigate(['updateUser',id]);
  }
  deleteUser(id){
    let dialogRef = this.dialog.open(DeleteapplicationPopupComponent, {
      height: '28%',
      width: '28%',
      data:{
        applicationoruser:'User'
      }
      
    });


    dialogRef.afterClosed().subscribe((result) => {
      let selectedOption = result;
      if (selectedOption == 'true') {

        this.Userservice.deleteUser(id).subscribe(
          data=>{
            this.router.navigate(['/userSetup']);
            this._snackBar.open('User deleted Successfully','X');
          },
          error=>{
            // console.log("exception");
            this._snackBar.open('Please try after sometime','X');
          },()=>{
            this.loaduserslist();
          }
        )

      }
    })


 
  }

  addUser() {
    let dialogref = this.dialog.open(UserRegistrationComponent , {
      height: '500px'
      
    });

    dialogref.afterClosed().subscribe(data=>{
      this.loaduserslist();
    })
 
  }

  updateUser(user) {
    let dialogref = this.dialog.open(UpdateUserComponent , {
      height: '95%',
      data:{
        userdata:user
      }
    });

    dialogref.afterClosed().subscribe(data=>{
      this.loaduserslist();
    })
 
  }


  checkboxChanged(user,checked){
   
    if(checked){
      this.emaillist.push(user.email_Id);
    }else{
      if(this.emaillist.includes(user.email_Id)){
        
        this.emaillist = this.emaillist.filter(function(item) {
          return item !== user.email_Id
      });
      }
    }
    


// console.log(parameter,"log");

    // console.log(this.emaillist,"emial list")
  }


  emailnotify(){
    this.userList.map(m=>{
      this.emaillist.map(f=>{
        
        if(m['email_Id'] ==f){
          let obj = {emailid:'',password:''};
          obj.emailid = f;
          obj.password =atob(m['password']);
          this.emailpwordcombo.push(obj);
          // console.log(this.emailpwordcombo,"sss");
          
        }
      })
    });
if(this.emaillist.length==0){
  
  this._snackBar.open('Please select a User to send Email Notification', 'X');
}
   else{
    

// console.log(this.emailpwordcombo,"combo");

  this.Userservice.sendMail(this.emailpwordcombo).subscribe(data=>{
      // console.log(data);
      this._snackBar.open("Email Notification sent Successfully ", 'X');
    },(error)=>{
      alert(error)
      this._snackBar.open(error, 'X');
      
    },()=>{
      
  
    }
    );

  } 



  }


}
