import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogData } from '../../download-popup/download-popup.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HTTPService } from '../../service/httpService.service';
import { ApplicationPopupComponent } from '../../application-popup/application-popup.component';

@Component({
  selector: 'app-dashboard-popup',
  templateUrl: './dashboard-popup.component.html',
  styleUrls: ['./dashboard-popup.component.css']
})
export class DashboardPopupComponent implements OnInit {

  @Output() submitClicked = new EventEmitter<any>();
loblist:any;
lobselect:any;
applist:any;
appselect:any;
orgId:any;
  constructor(private http: HTTPService,private router: Router,
    public dialogRef: MatDialogRef<ApplicationPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.orgId=sessionStorage.getItem("orgId");
    this.http.getLOBList(this.orgId).subscribe(
      (data)=>{this.loblist=data
        console.log(this.loblist,"loblist'''''''''");
        
      })

  }

  loblistchanged(event){

    console.log(event.value,"lobselect........")
    console.log(event.source.triggerValue,"lobselect........")
sessionStorage.setItem('apploblist',event.source.triggerValue);


    this.http.getlobtoquestioner(event.value).subscribe(
      (data)=>{this.applist=data
        console.log(this.applist,"applist'''''''''");
        
      })
  }

 Appchanged(event){
    console.log(event.value,"lobselect........")
    console.log(event.source.triggerValue,"lobselect........")
    this.appselect = event.value;
    sessionStorage.setItem('appidfrompopup', this.appselect);
    sessionStorage.setItem('appnamefrompopup', event.source.triggerValue);
    
  }

  cancel(){
  window.history.back();
  sessionStorage.removeItem('appidfrompopup');
    this.dialogRef.close(false);
  }

  start(){
    if(sessionStorage.getItem('apploblist')=="Select LOB"){
      this._snackBar.open("Select a valid LOB","X");
    }else if( sessionStorage.getItem('appnamefrompopup')=="Select Application"){
      this._snackBar.open("Select a valid Application","X");
    }
    else{
    const data = this.appselect;
    this.submitClicked.emit(this.appselect);
    this.dialogRef.close();
    }
  }



  gotToUpload(){
    this.dialogRef.close();
    this.router.navigate(['fileupload']);

  }



}
