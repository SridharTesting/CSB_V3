import { Component, OnInit,ViewChild,ElementRef, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import jsPDF from "jspdf";
import * as html2pdf from "html2pdf.js"
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmationDialogbox } from '../service/confirmation-dialogbox/confirmation-dialogbox.component';


@Component({
  selector: 'app-development',
  templateUrl: './development.component.html',
  styleUrls: ['./development.component.css']
})
export class DevelopmentComponent implements OnInit {
  title = 'angular-confirmation-dialog';
  constructor(@Inject(MAT_DIALOG_DATA) public data,
  public dialogRef: MatDialogRef<DevelopmentComponent>) { }
  // constructor(public dialog: MatDialog,) {}
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }


 
onExportClick(){
  const options ={
    filename:'mustu.pdf',
    image:{type:'jpeg'},
    html2canvas:{},
    jsPDF:{orientation:'landscape'}
  };
  const content: Element = document.getElementById('element');
  html2pdf()
  .from(content)
  .set(options)
  .save();
  }



  // openDialog(): void {
  //  let dialogRef = this.dialog.open(ConfirmationDialogbox, {
  //     width: '350px',
  //     data: "Do you confirm the deletion of this data?"
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if(result) {
  //       console.log('Yes clicked');
  //       // DO SOMETHING
  //     }
  //   });
  // }



}

