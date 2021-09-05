import { Component, HostListener, OnInit ,ViewChild} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {MatDialog, MAT_DIALOG_DATA, MAT_DIALOG_DEFAULT_OPTIONS,MatDialogRef} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { HTTPService } from '../service/httpService.service';
import { AppMaster } from '../model/app-master';
// import {FHN_Application_Table} from '../model/infra';
import { MatSidenav } from '@angular/material/sidenav';
import { Store, select } from '@ngrx/store';

import { BLACK_ON_WHITE_CSS_CLASS } from '@angular/cdk/a11y/high-contrast-mode/high-contrast-mode-detector';
import { constant as CONSTANT } from '../constants';
import { MultilevelNodes } from 'ng-material-multilevel-menu';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
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
  selector: 'app-override-rlane',
  templateUrl: './override-rlane.component.html',
  styleUrls: ['./override-rlane.component.css']
})
export class OverrideRlaneComponent implements OnInit {
  caAppList:any;
 
  Displaydata:any;
  
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
  displayList = true;
  openform=true;
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
  pageListdata=true;
  userName:any;
  openform1=true;
  
  dispinfo1=true;
  
  property:string;
  dt: any; 
    dataDisplay: any; 
  expandCollapseStatus: string = null;
 
  processList:FHN_Process_Data[];
  strategyid:any;
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
  loblist:any;
  lobselect:any;
  applist:any;
  appselect:any;
  appselectid: any;
  rlaneselected: any;
  rlanelist: any;
  rlaneValue: any;
  rlaneselect: any;
  stratergy: any;
  commentSubmissionForm: FormGroup;
  comment: String;
  rlane_strategy_lookup:any;


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
  
  ngOnInit(): void {
    debugger;
    this.orgId=sessionStorage.getItem("orgId");
    this.Service.getcamaster().subscribe((data)=>{
      this.caAppList=data;
      console.log(this.caAppList,"/////////////////////////////////////////");
      
    });


    this.Service.ca_rlane_strategy_lookup().subscribe((data)=>{
      this.rlane_strategy_lookup=data;
      console.log(this.rlane_strategy_lookup,"//////rlane_strategy_lookup/////////rlane_strategy_lookup//////////////////////////");
      
    });

    this.rlanelist=[];
    this.Service.getrlaneList().subscribe(
      data=>{
  
        this.rlanelist=data;
        
        
        
        console.log(this.rlanelist,"listttttttttttttttttttttttt");
      },
      error=>{
        this.errorMsg="Some error"
      }
      
  
         )
    this.loblist=[];
    this.Service.getLOBList(this.orgId).subscribe(
      data=>{

        this.loblist=data;
        console.log(this.loblist,"???????????????????????????????????????????????");
        

    },
    error=>{
      this.errorMsg="Some error"
    }


       )
 
  }

  registerForm = this.formBuilder.group({
    ca1:['', Validators.required],
    ca2:['',Validators.required],
    ca3:['',Validators.required],
    ca4:['',Validators.required],
    commentTest: ['', Validators.required]
  });
 
  

  removeButton(){
    this.carbtn=false;
    return this.carbtn;

  }
  
       
loblistchanged(event)
{
  console.log(event.value,"lobselect........")
  console.log(event.source.triggerValue,"lobselect........")
sessionStorage.setItem('apploblist',event.source.triggerValue);

this.Service.getlobtoquestioner(event.value).subscribe(
  (data)=>{this.applist=data
    console.log(this.applist,"applist'''''''''");
    this.applist.map(m=>{
      m.rlanelist=this.rlanelist;
      
    })
    console.log(this.applist,"!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  })
  this.Service.getovveride(event.value).subscribe(
    (data)=>{
      this.rlaneselected = data[0].rlane_Strategy;
      
      console.log(this.rlaneselected,"rlaneselected");
      this.rlanelist.push(data)
      
      console.log(data,'dtaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
     
      console.log(this.rlanelist,'............');
      
      

     
    }
    
  )

}

Appchanged(event){
  console.log(event.value,"lobselect111........")
  console.log(event.source.triggerValue,"lobselect........")
  this.appselect = event.value;
  console.log(this.appselect);
  this.appselectid=event.source.triggerValue;
  sessionStorage.setItem('appidfrompopup', this.appselect);
  sessionStorage.setItem('appnamefrompopup', event.source.triggerValue);
  console.log(this.appselectid,"jfgkyvjgvbh")

  this.Service.getovveride(event.value).subscribe(
    (data)=>{
      this.rlaneselected = data[0].rlane_Strategy;
      
      console.log(this.rlaneselected,"rlaneselected");
      this.rlanelist.push(data)
      
      console.log(data,'dtaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
     
      console.log(this.rlanelist,'............');

     
    }
    
  )
}
getClient(app,event:any){
  console.log(app);
  console.log(event,"jhvscj");
  this.displayAppData = app;
  }
  
rlanechanged(event,id)
{

  debugger;
  console.log(id);
  this.rlaneValue=id;
  console.log(event.value,"rlaneselect........")
  console.log(event.source.triggerValue,"lobselect........")
  this.rlaneselect = event.value;
  this.stratergy=event.source.triggerValue;
  console.log( this.rlaneselect);
  sessionStorage.setItem('rlaneidfrompopup', this.rlaneselect);
  sessionStorage.setItem('rlanenamefrompopup', event.source.triggerValue);

  console.log(this.stratergy,"gcvjgv")
  
}
save()
{
  
  this.Service.updatecaappmaster(this.caAppList).subscribe(
    data=>{
      // alert("success")
    },(e)=>{
      alert(e);
    },()=>{
      this._snackBar.open("Override successful","X")
    }
  )
}

changeValue(property: string, event: any,app) {
  console.log(event,"%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
  console.log(event.target.value,"key pressed",app.app_Id,app.rlane_Strategy_Id);
  this.property=property;
  app[property]= event.target.value;
  this.gridData.set(app.appId,app);
  console.log("Grid Data",this.gridData.entries());
  
}

changestrategyValue(property: string, event: any,app){
  let selectedrlaneid =0;
  this.rlane_strategy_lookup.map(m=>{
    if(m.rlane_Strategy==event.value)
    {
      selectedrlaneid = m.rlane_Strategy_Id;
    }
  })
  console.log(selectedrlaneid,"ddchaned",app.app_Id,app.rlane_Strategy_Id,app.comments);
  this.caAppList.forEach(element => {
    if(element.appId==app.app_Id){
      element.rlaneStrategyId = selectedrlaneid;
      console.log(element,"elemtssss")
    }
  });
}

changecommentsValue(property: string, event: any,app){

  console.log(event.target.value,"ddchaned",app.app_Id,app.rlane_Strategy_Id,app.comments,this.strategyid);
  this.caAppList.forEach(element => {
    if(element.appId==app.app_Id){
      element.comments = event.target.value,
      console.log(element,"elemtssss")
    }
  });
}


}