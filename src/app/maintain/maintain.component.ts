import { Component, HostListener, OnInit ,ViewChild} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {MatDialog, MAT_DIALOG_DATA, MAT_DIALOG_DEFAULT_OPTIONS,MatDialogRef} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { HTTPService } from '../service/httpService.service';
import { AppMaster } from '../model/app-master';
import {FHN_Application_Table} from '../model/infra';
import { MatSidenav } from '@angular/material/sidenav';
import { Store, select } from '@ngrx/store';
import { BLACK_ON_WHITE_CSS_CLASS } from '@angular/cdk/a11y/high-contrast-mode/high-contrast-mode-detector';
import { constant as CONSTANT } from '../constants';
import { MultilevelNodes } from 'ng-material-multilevel-menu';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import {Validators, FormBuilder} from '@angular/forms';
import { FHNAppData } from '../model/FHN_APP_Data';
import { FHNVersion } from '../model/FHN_Version';
import { Increment, Decrement, Reset } from '../Store/actions/counter';
import { FHN_Process_Data } from '../model/FHN_Process_Data';
import { fhnHistoryData } from '../model/FHN_History_Data';
import { FHN_Infra_Data } from '../model/FHN_Infra_data';

import { MatSnackBar, MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,MatSnackBarModule } from '@angular/material/snack-bar';
import { DialogService } from '../service/dialog-service.service';
import { MatConfirmDialogComponent } from '../mat-confirm-dialog/mat-confirm-dialog.component';

@Component({
  selector: 'app-maintain',
  templateUrl: './maintain.component.html',
  styleUrls: ['./maintain.component.css']
})
export class MaintainComponent implements OnInit {
  editSettings:[];
  Users:AppMaster[];
  selectedOption:any;
  public data = [];
  //Users1:Infra[];
  totalRecords:number;
  page:number=1;
  orgName:string="";
  counter:number=0;
  opened = true;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;
  appitems: MultilevelNodes[] = CONSTANT.sidebarDemoLinks;
  config = CONSTANT.sidebarConfigurations;
  displayList = false;
  openform=false;
  infraList : FHN_Infra_Data[];
  // versionNum:number;
  testData:any;
  appDetails:any;
  displayAppData:any;
  displayProcessData:any;
  carbtn=true;
  editField:any;
  pageOfItems: Array<any>;
  gridData = new Map();
  processDataGrid=new Map();
  finalDataGridForProcess=new Map();
  pageListdata=false;
  userName:any;
  openform1=false;
  openform2=false;
  openform3=false;
  openform4=false;
  dispinfo1=false;
  dispinfo2=false;
  dispinfo3=false;
  dispinfo4=false;
  property:string;
  dt: any; 
    dataDisplay: any; 
  expandCollapseStatus: string = null;
  appList:FHNAppData[];
  processList:FHN_Process_Data[];
  
  appdata=new FHNAppData();
  errorMsg:string;
  versionData=new FHNVersion();
  userDisplayName:any;
  name:any;
  checked:boolean=false;
  versionNum :number=0;
  orgId:any;
  loggedIn:boolean=true;
  finalArray:any=[];
 
 

  constructor(private http:HttpClient,public dialog: MatDialog,private Service:HTTPService, private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private router: Router, private formBuilder: FormBuilder,private _snackBar: MatSnackBar,private dialogService: DialogService,)
    
    {
      setTimeout(() => {
        this.displayList = true;
      }, 100);
    }
    selectedItem($event) {
      console.log($event);
    }

    selectedLabel($event) {
      console.log($event);
    }

    redirect(link) {
      this.router.navigate([link]);
      setTimeout(() => {
        this.displayList = true;
      }, 100);
    }

    setExpandCollapseStatus(type) {
      this.expandCollapseStatus = type;
    }
    changeValue(property: string, event: any,app) {
      // this.fieldChanged=true;
      this.editField = event.target.textContent;
      console.log(event,"event changed ");
      this.property=property;
     
      app[property]= event.target.textContent;
      this.gridData.set(app.appId,app);
      console.log(event.target.style,"style ");
      event.target.style['background-color'] ="Yellow";
      console.log(this.editField);
      console.log("Grid Data",this.gridData.entries());
      // event.target.color
    }

    changeValueProcess(id:number,property: string, event: any,process) {
      // this.fieldChanged=true;
      // event.target.autofocus=false; 
   
      // this.editField =event.target.value;
      console.log(event,"event changed ");
      console.log(event.target,"lets seeeeee")
      // this.property=property;
    console.log(event,"checkcheck")
      process[property]= event.target.textBox;
  
      this.processDataGrid.set(process.appId,process);
      console.log(event.target.style,"style ");
      event.target.style['background-color'] ="Yellow";
      console.log(this.editField);
      console.log(" Process Grid Data",this.processDataGrid.entries());
      // event.target.color

      console.log(this.editField);
      console.log("Grid Data",this.gridData.entries());

    }
    getClient(app){
console.log(app);
this.displayAppData=app;
    }
    onprocess()
 {
   this.onClickOpenForm1();
   this.removeButton();
 }
 oninfrastructure()
 {
   this.onClickOpenForm2();
   this.removeButton();
 }
 onapplication()
 {
   this.onClickOpenForm3();
   this.removeButton();
 }

    getClientProcess(process){
      console.log(process);
    this.displayProcessData=process;
     
    }
   openDialog()
   {
     let dialogRef= this.dialog.open(DialogComponent);

     dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
      console.log( this.selectedOption);
      if(this.selectedOption){
   debugger;
        this.appdata.appId=this.displayAppData.appId;
         this.appdata.appSystem=this.displayAppData.appSystem;
         this.appdata.orgId=sessionStorage.getItem('orgId');

       if(this.property=="description"){
        this.appdata.description=this.editField;
       }
       else{
         this.appdata.description=this.displayAppData.description
       }
       
    
     
   
        
        //this.appdata.versionId=1;
        this.Service.updateFhnData(this.appList).subscribe(
          data=>{
            console.log("Updated successfully");
          }
        )

      }
    });
   }


   openDialogforProcess(){
  //   let dialogRef= this.dialog.open(DialogComponent);

  //   dialogRef.afterClosed().subscribe(result => {
  //    this.selectedOption = result;
  //    console.log( this.selectedOption);
  //    if(this.selectedOption){
  // debugger;
      
     
    
  
       
  //      //this.appdata.versionId=1;
  //      this.Service.getFHNProcessData(this.processList).subscribe(
  //        data=>{
  //          console.log("Updated successfully");
  //        }
  //      )

  //    }
  //  });

  this.dialogService.openConfirmDialog('Are you sure to delete this record ?')
  .afterClosed().subscribe(res =>{
    if(res){
      this.Service.getFHNProcessData(this.processList).subscribe(
               data=>{
                 console.log("Updated successfully");
               }
             )
      
           }
         });
     
    }
 

   changeValueInfra(property: string, event: any,infra) {
    // this.fieldChanged=true;
    // this.editField = event.target.textbox;
    console.log(event,"event changed ");
    this.property=property;
    infra[property]= event.target.textContent;
    //this.infraList.set(process.appId,process);
    console.log(event.target.style,"style ");
    event.target.style['background-color'] ="Yellow";
    console.log(this.editField);
    console.log(" Process Grid Data",this.processDataGrid.entries());
    // event.target.color

    console.log(this.editField);
    console.log("Grid Data",this.gridData.entries());

  }

   saveBaselineDataforProcess(){

    this.userDisplayName = sessionStorage.getItem('username');
    this.orgId= sessionStorage.getItem('orgId');
    this.orgName=sessionStorage.getItem('OrgName');
   
    this.Service.getnewVersion(this.orgName,3).subscribe((data) => {
      debugger;
      
      this.versionNum =data?parseInt(data):0
      
      this.versionNum=(this.versionNum+1);
      
      this.versionData.author  = this.userDisplayName .substring(0, this.userDisplayName .lastIndexOf("@"));
    this.versionData.orgId=this.orgId;
    this.versionData.createdDate=new Date().toISOString();
   this.versionData.selectview=3;
   
    this.versionData.description="version"+this.versionNum+"-"+this.versionData.createdDate+"-"+ this.versionData.author;
    this.versionData.versionNum=this.versionNum;
   
  
    
    this.Service.createVersion(this.versionData).subscribe(
      data=>{
       
       this.testData=data;
      

        this.Service.processVersionData(this.processList,this.testData.versionId).subscribe(
          result=>{
            
            this.Service.getfhnProcessList().subscribe(r=>{
      this.processList=r;
     
        });
          },
          e => {console.log(e)}
          ,
         
        )
      },
      (error)=>{console.log("there was an error")},
    );
    });
  }
   
  saveBaselineDataInfrastructure(){
    


    this.userDisplayName = sessionStorage.getItem('username');
    this.orgId= sessionStorage.getItem('orgId');
    this.orgName=sessionStorage.getItem('OrgName');
   this.name  = this.userDisplayName .substring(0, this.userDisplayName .lastIndexOf("@"));
 
   this.userName=this.name.charAt(0).toUpperCase();
    
    this.Service.getnewVersion(this.orgName,2).subscribe((data) => {
     
      this.versionNum =data?parseInt(data):0
    
      this.versionNum=(this.versionNum+1);
      
      this.versionData.author  = this.userDisplayName .substring(0, this.userDisplayName .lastIndexOf("@"));
    this.versionData.orgId=this.orgId;
    this.versionData.createdDate=new Date().toISOString();
   this.versionData.selectview=2;
   
    this.versionData.description="version"+this.versionNum+"-"+this.versionData.createdDate+"-"+ this.versionData.author;
    this.versionData.versionNum=this.versionNum;
   

    this.Service.createVersion(this.versionData).subscribe(
      (data:FHNVersion) => {
        let vid = data;
       debugger;
        this.Service.createInfraHistory(this.infraList,vid.versionId).subscribe(
          result => {
            
            this.Service.getInfraData(this.orgId).subscribe(r=>{
              
              this.infraList = r;
            
            });
          },
          e => {console.log(e)}
          ,
          /*()=>{
            this.Service.getnewVersion(this.orgName,2).subscribe(
              data => {
                this.versionNum=data;
              console.log("Updated Version Number from db")
            }
            )
          }*/
        )
      },
      (error)=>{console.log("there was an error")},
    );
    });
  }


   saveBaselineData(){
  

    
    this.userDisplayName = sessionStorage.getItem('username');
    this.orgId= sessionStorage.getItem('orgId');
    this.orgName=sessionStorage.getItem('OrgName');
   
    this.Service.getnewVersion(this.orgName,1).subscribe((data) => {
    
     
      this.versionNum =data?parseInt(data):0
  
      this.versionNum=(this.versionNum+1);
     
      this.versionData.author  = this.userDisplayName .substring(0, this.userDisplayName .lastIndexOf("@"));
    this.versionData.orgId=this.orgId;
    this.versionData.createdDate=new Date().toISOString();
    this.versionData.selectview = 1;
    this.versionData.description="version"+this.versionNum+"-"+this.versionData.createdDate+"-"+ this.versionData.author;
    this.versionData.versionNum=this.versionNum;

  
    this.Service.createVersion(this.versionData).subscribe(
      result=>{
     
       this.appDetails=result;
 
        this.Service.ApplicationVersionData(this.appList,this.appDetails.versionId).subscribe(
          
          res=>{
          
           
            this._snackBar.open('BaselineData saved Successfully', 'close', {
              duration: 5000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              
            });
          },
          error=>{
            this._snackBar.open('Could not save BaselineData, Please try again', 'close', {
              duration: 5000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              
            });

          }
        )
      }
    )
    
    });
    
  
  }
  openDialogInfra(){
    let dialogRef= this.dialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe(result => {
    console.log("opendiaologue");
    this.selectedOption = result;
    if(this.selectedOption){
      debugger;
     
           this.Service.pushFHNInfraData(this.infraList).subscribe(
             data=>{
               console.log("Updated successfully");
             }
           )
   
         }

    });
  }

  ngOnInit(): void {
    debugger;
    
    this.onClickOpenForm1();
    this.onClickOpenForm2();
    this.onClickOpenForm3();
    this.Users=[];
    this.orgName=sessionStorage.getItem("OrgName");
    console.log(this.orgName);
    this.orgId=sessionStorage.getItem('orgId');
    this.Service.getnewVersion(this.orgId,1).subscribe((data) => {
      debugger;
      console.log(data,"version no barbekhyu")
      this.versionNum =data?data:0;
      console.log(this.versionNum,"version id")
    });


    //this.Users1=[];tem("OrgName");
    //this.orgName=sessionStorage.getI






    console.log(window.innerWidth)
    if (window.innerWidth < 768) {
      this.sidenav.fixedTopGap = 87;
      this.opened = false;
    } else {

      this.opened = true;
    }

 
  }

 

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
}

  isBiggerScreen() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width < 768) {
      return true;
    } else {
      return false;
    }
  }

  registerForm = this.formBuilder.group({
    ca1:['', Validators.required],
    ca2:['',Validators.required],
    ca3:['',Validators.required],
    ca4:['',Validators.required]
  });
  registerForm1 = this.formBuilder.group({
    ca1:['', Validators.required],
    ca2:['',Validators.required],
    ca3:['',Validators.required],
    ca4:['',Validators.required]
  });
  registerForm2 = this.formBuilder.group({
    AppId:['', Validators.required],
    ca2:['',Validators.required],
    ca3:['',Validators.required],
    ca4:['',Validators.required]
  });
  registerForm3 = this.formBuilder.group({
    ca1:['', Validators.required],
    ca2:['',Validators.required],
    ca3:['',Validators.required],
    ca4:['',Validators.required]
  });
  registerForm4 = this.formBuilder.group({
    ca1:['', Validators.required],
    ca2:['',Validators.required],
    ca3:['',Validators.required],
    ca4:['',Validators.required]
  });

  removeButton(){
    this.carbtn=false;
    return this.carbtn;

  }
  onClickOpenForm1(){
debugger;
    //this.checked=true;
    if(this.openform1){
      this.openform1 = false;
    }
    else if(this.openform2){
      this.openform2 =false;
    }
    this.openform=true;



    //change

    this.infraList=[];
    this.Service.getInfraData(this.orgId).subscribe(
      data=>{

        this.infraList=data;
      console.log(  this.infraList,"testest")

    },
    error=>{
      this.errorMsg="Some error"
    }


       )



  return this.openform;
}

  

  onClickOpenForm2(){
    this.checked=true;
    if(this.openform){
      this.openform = false;
    }
    else if(this.openform2){
      this.openform2 =false;
    }
    this.openform1=true;


    //change
    //this.processList=[];
    this.Service.getfhnProcessList().subscribe(
      data=>{
        this.processList=data;
      },
      error=>{
        console.log(error)
      }
   
      

        /*this.processList=data;
        this.processList.map((data:fhnHistoryData) =>
        {

        
          this.processDataGrid.set(data.appId,data);

        })

      console.log(this.processList);
      // console.log(this.appList."applist version num berrrrrrrrrr")
      console.log(this.processDataGrid ,"processDataGrid Data");

    },*/
  
    


       )



  return this.openform2;
}

  onClickOpenForm3(){
    this.checked=true;

    if(this.openform1){
      this.openform1 = false;
    }
    else if(this.openform){
      this.openform =false;
    }

    this.openform2=true;
    this.appList=[];
    this.Service.getfhnAppData().subscribe(
      data=>{
        // data.versionNum = this.versionNum+1;
        // console.log(data.versionNum,"data . version number ")
        this.appList=data;
        console.log( this.appList);


       /* this.appList.map((data:FHNAppData) =>
          {

           
            this.gridData.set(data.appId,data);

          })
        console.log(this.appList);
        // console.log(this.appList."applist version num berrrrrrrrrr")
        console.log(this.gridData ,"Grid Data");*/

      },
      error=>{
        this.errorMsg="Some error"
      }


         )



    return this.openform2;
  }

  displayinfo1(){
    this.dispinfo1=true;
    return this.dispinfo1;
  }
  displayinfo2(){
    this.dispinfo2=true;
    return this.dispinfo2;
  }
  displayinfo3(){
    this.dispinfo3=true;
    return this.dispinfo3;
  }

  DeleteApplication(item:String){


    this.dialogService.openConfirmDialog('Are you sure to delete this record ?')
  .afterClosed().subscribe(res =>{
    if(res==true){
      this.Service.DeleteinfraData(item).subscribe(
        (r)=>{
                  console.log("deleted");
                },
                (e) =>{
          
                  alert("error");
              
                },()=>{
                  
                  this._snackBar.open("Deleted Sucessfully","X");
                  window.location.reload();

                }
              )
             
      
           }
           else{
            this._snackBar.open("Delete Canceled","X")
           }
         });
}
}

