import { Component, OnInit } from '@angular/core';
import { HTTPService } from 'src/app/service/httpService.service';
import { LOB } from 'src/app/model/LOB';
import { Organization } from 'src/app/model/organization';
import { FormGroup, FormControl } from '@angular/forms';
import { lobMappingtoorg } from 'src/app/model/lobMappingtoorg';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
@Component({
  selector: 'app-lob-to-app-mapping',
  templateUrl: './lob-to-app-mapping.component.html',
  styleUrls: ['./lob-to-app-mapping.component.css']
})
export class LobToAppMappingComponent implements OnInit {
  errorMsg:string;
orgs:{};
lobs:{};
Model = {
  IsApproved: ''
};
lobHasError=true;
lobApps=false;
appsMappedToLObs=new lobMappingtoorg();
createAppToLOBForm: FormGroup;
apps=[];
pageOfItems: Array<any>;  
totalRecords:number;
page:number=1;
pageListdata=false;
myModel=true;
appId:any;
successMessage:any;
horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
submitted:boolean;
get formControls() { return this.createAppToLOBForm.controls; }

  constructor(private service:HTTPService,private router: Router,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
   
this.service.getOrgs().subscribe(
  data=>this.orgs=data
);




    this.createAppToLOBForm = new FormGroup({
      
      org: new FormControl(''),
      lob: new FormControl(''),
      appName:new FormControl('')
      
    });
  }
  onBack(){
    this.router.navigate(['homePage/appSurvey']);
  }

onSubmit(){
  console.log(this.appsMappedToLObs)
this.appsMappedToLObs.appId=this.appId;
this.appsMappedToLObs.lobId=this.appsMappedToLObs.lobId;
this.appsMappedToLObs.recInsDt=new Date().toISOString();
this.appsMappedToLObs.recUpdDt=new Date().toISOString();
if(this.appsMappedToLObs.appId){
  this.submitted=true;
this.service.saveAppsMappedToLobs(this.appsMappedToLObs).subscribe(
  data=>{
    console.log(data)
    this._snackBar.open('Application Mapped Successfully', 'close', {
      duration: 5000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
)
}
}

checkBox(e){
  debugger;

  console.log(e);
  

}
validateLob(value){
if(value==='default'){
this.lobHasError=true;
}
else{
  this.lobHasError=false;
}
}

onChangePage(pageOfItems: Array<any>) {
  // update current page of items
  this.pageOfItems = pageOfItems;
}
onNativeChange(id){
  this.appsMappedToLObs.appId=id;
  this.appsMappedToLObs.lobId=this.createAppToLOBForm.value.lob;
this.appsMappedToLObs.recInsDt=new Date().toISOString();
this.appsMappedToLObs.recUpdDt=new Date().toISOString();
 console.log(this.appsMappedToLObs);
}



  onChangeOrg(orgId:number){
    if(orgId){
      this.service.getLobBasedOnOrg(orgId).subscribe(
        data=>{
          this.lobs=data;

        }
      )
      
    }
    else{
      this.lobs=null;
    }
  }

  onChangeLOB(id:number){
    debugger;
    if(id){
      this.lobApps=true;
      this.service.getAppsTaggedToLOBS(id).subscribe(
        data=>{
          this.apps=data
          console.log("sumana testing")
          console.log(this.apps)
          this.apps.forEach( (myObject, index) => {
            debugger;
            if(myObject.hasOwnProperty("lobId")){
              console.log(this.apps)
              
              
              
            }
            else{
             
             
              this.apps[index].lobId = 0; 
              console.log(this.apps)
            
            }
          });



      
          
          
        }

      )
    }
    else{
      this.apps=null
    }
  }
  }
  
    


