import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogData } from '../download-popup/download-popup.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HTTPService } from '../service/httpService.service';


@Component({
  selector: 'app-application-popup',
  templateUrl: './application-popup.component.html',
  styleUrls: ['./application-popup.component.css']
})
export class ApplicationPopupComponent implements OnInit {
  @Output() submitClicked = new EventEmitter<any>();
loblist:any;
lobselect:any;
applist:any;
appidselect:any;
lobname:any;
appname:any;
orgId:any;
roleId:any;
lobId:any;
  constructor(private http: HTTPService,private router: Router,
    public dialogRef: MatDialogRef<ApplicationPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.lobId=sessionStorage.getItem("LobId");
    this.orgId=sessionStorage.getItem("orgId");
    this.roleId=sessionStorage.getItem("roleId");



    this.http.getLOBList(this.orgId).subscribe(
      (data)=>{this.loblist=data
        if(this.roleId==3)
        {this.loblist.map(m=>{
          if(this.lobId==m.lobId)
          this.lobname = m.lobName;
        })
      }
      })

      if(this.roleId==3){
        this.http.getlobtoquestioner(parseInt(this.lobId)).subscribe(
          (data)=>{this.applist=data
            
          })
      }

  }

  loblistchanged(event){

    
    this.lobname=event.source.triggerValue;
    sessionStorage.setItem('lobid',event.value);
    sessionStorage.removeItem('apploblist');


if(this.roleId!=3){
  this.http.getlobtoquestioner(event.value).subscribe(
    (data)=>{this.applist=data
      // console.log(this.applist,"applist");
      
    })
}
   
  }

 Appchanged(event){
    this.appidselect = event.value;
    this.appname=event.source.triggerValue;
    sessionStorage.removeItem('appidfrompopup');
    sessionStorage.removeItem('appnamefrompopup');
    
    
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
      sessionStorage.setItem('apploblist',this.lobname);
      sessionStorage.setItem('appidfrompopup', this.appidselect);
    sessionStorage.setItem('appnamefrompopup', this.appname);
    const data = this.appidselect;
    this.submitClicked.emit(this.appidselect);
    this.dialogRef.close();
    }
  }


}
