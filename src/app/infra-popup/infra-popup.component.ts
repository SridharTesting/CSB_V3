import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogData } from '../download-popup/download-popup.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HTTPService } from '../service/httpService.service';


@Component({
  selector: 'app-infra-popup',
  templateUrl: './infra-popup.component.html',
  styleUrls: ['./infra-popup.component.css']
})
export class InfraPopupComponent implements OnInit {

  constructor(private http: HTTPService,private router: Router,
    public dialogRef: MatDialogRef<InfraPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar) { }

    search:string;
  chartvalue:any;
  title:any;
  datacenter=false;
          physicalvsvirtual=false; 
      
          
  piechartname:any;
    ngOnInit(): void {
      window.scrollTo(0, 0);
      this.piechartname=this.data.piechartname
      this.chartvalue=this.data.dataKey
      // console.log(this.chartvalue,"this.chartvaluethis.chartvalue");
  this.title=this.data.title
  this.datacenter=this.data.datacenter;
  this.physicalvsvirtual = this.data.physicalvsvirtual;
  // console.log(this.datacenter);
  // console.log(this.physicalvsvirtual);
  // this.Applicationcriticalitydata=this.data.Applicationcriticalitydata
  // this.Datacriticalitydata = this.data.Datacriticalitydata
      // console.log(this.chartvalue,"ffffffffffchartvaluefffffffffffffffff")
    }
  
  
    cancel(){
     
  
        this.dialogRef.close(false);
      }
  





}
