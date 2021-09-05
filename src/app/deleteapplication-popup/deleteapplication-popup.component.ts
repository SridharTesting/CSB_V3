import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-deleteapplication-popup',
  templateUrl: './deleteapplication-popup.component.html',
  styleUrls: ['./deleteapplication-popup.component.css']
})
export class DeleteapplicationPopupComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DeleteapplicationPopupComponent) { }
  applicationoruser:any;
  ngOnInit(): void {
    this.applicationoruser = this.data.applicationoruser;
  }

}
