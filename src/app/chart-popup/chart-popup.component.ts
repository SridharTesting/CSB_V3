import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogData } from '../download-popup/download-popup.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HTTPService } from '../service/httpService.service';
import { any } from '@amcharts/amcharts4/.internal/core/utils/Array';

@Component({
  selector: 'app-chart-popup',
  templateUrl: './chart-popup.component.html',
  styleUrls: ['./chart-popup.component.css']
})
export class ChartPopupComponent implements OnInit {

  constructor(private http: HTTPService,private router: Router,
    public dialogRef: MatDialogRef<ChartPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar) { }
chartvalue:any;
title:any;
Applicationcriticalitydata=false;
Datacriticalitydata=false;
piechartname:any;
  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.piechartname=this.data.piechartname
    this.chartvalue=this.data.dataKey
this.title=this.data.title
// this.Applicationcriticalitydata=this.data.Applicationcriticalitydata
// this.Datacriticalitydata = this.data.Datacriticalitydata
    // console.log(this.chartvalue,"ffffffffffchartvaluefffffffffffffffff")
  }


  cancel(){
   

      this.dialogRef.close(false);
    }


}
